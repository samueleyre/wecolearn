<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Command\UnbalanceProxyCommand; 
use Bg\BgBundle\Metier\Recherche\Command\NextProxyCommand; 


class UnbalanceProxyCommandHandler {

	public function __construct( $em, $logger ) {
		$this->em = $em;
		$this->logger = $logger;	
	}

	public function handle( UnbalanceProxyCommand $command ) {
		
		$this->log("Shift des proxy");

		$query = "
			SELECT proxy 
			FROM AppBundle:Proxy proxy 
			WHERE proxy.down = 0 
			AND proxy.gBlacklisted = 0
			ORDER BY proxy.useTime ASC
		";
		$proxies = $this->em->createQuery( $query )->getResult();

		$this->log( sprintf("Shift de %s proxy valides", count( $proxies) ) );

		$res = [];

		foreach( $proxies as $proxy ) {
			$res[] = $proxy->getUseTime();
		}

		$lastUseTime = array_pop( $res );
		// first element become the last.
		array_unshift( $res, $lastUseTime );

		foreach( $proxies as $index => $proxy ) {
			$proxy->setUseTime($res[$index]);
			$this->em->merge( $proxy);
		}
		$this->em->flush();

		$nextCommand = new NextProxyCommand();
		$nextCommand->waitFor('d');
		$command->setNextCommand( $nextCommand);
	}

	public function log( $message ) {
		$this->logger->info( $message );
	}	
}