<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Command\InitCommand; 
use Bg\BgBundle\Metier\Recherche\Command\FetchProxyCommand; 


class InitCommandHandler {

	public function __construct( $em, $logger ) {
		$this->logger = $logger;
		$this->em = $em;
	}

	public function handle(InitCommand $command ) {
		//$this->clearProxies();
		$this->logger->info('Initialisation de la séquence de recherche');
	}

	private function clearProxies() {
		
		$qb = $this->em->createQueryBuilder();
		$q = $qb->update('AppBundle:Proxy', 'proxy')
        ->set('proxy.gBlacklisted', 0)
        ->set('proxy.down', 0)
        ->getQuery()
		->execute();

	}
}