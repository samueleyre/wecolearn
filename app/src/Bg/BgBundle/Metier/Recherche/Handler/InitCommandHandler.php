<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Command\InitCommand; 
use Bg\BgBundle\Metier\Recherche\Command\FetchProxyCommand; 


class InitCommandHandler {

	public function __construct( $logger ) {
		$this->logger = $logger;
	}

	public function handle(InitCommand $command ) {

	}
}