<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Command\UnbalanceProxyCommand; 
use Bg\BgBundle\Metier\Recherche\Command\FetchProxyCommand; 


class UnbalanceProxyCommandHandler {

	public function __construct( $em, $logger ) {
		$this->em = $em;	
	}

	public function handle( UnbalanceProxyCommand $command ) {
		
		$query = "
			SELECT proxy 
			FROM AppBundle:Proxy proxy 
			WHERE proxy.down = 0 
			AND proxy.gBlaklisted = 0
			ORDER BY proxy.useTime ASC
		";
		$proxies = $this->em->creatQuery( $query )->getResult();

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

		$nextCommand = new FetchProxyCommand();
		$nextCommand->waitFor('d');
		$command->setNextCommand( $nextCommand);
	}
}