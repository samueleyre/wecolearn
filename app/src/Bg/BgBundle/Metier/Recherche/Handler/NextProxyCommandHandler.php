<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Command\NextProxyCommand;
use Bg\BgBundle\Metier\Recherche\Command\CriticCommand;
use Bg\BgBundle\Metier\Recherche\Command\ProcessSearchCommand;
use Bg\BgBundle\Metier\Recherche\Command\PanicProxyCommand;



class NextProxyCommandHandler {

	public function __construct( $proxyWahreHouse, $logger ) {
		$this->warehouse = $proxyWahreHouse;
		$this->logger = $logger;
	}

		
	public function handle(NextProxyCommand $command ) {

		$coolProxy = null;
		
		$idealConditions = [ 'down' => 0, 'googleBlacklisted' => 0 ];

		$previousProxy = $command->fetchParam();
		
		$this->log("Recherche d'un nouveau proxy");
		
		try {
			
			$coolProxy = $this->warehouse->getNextProxy($idealConditions);
		
		} catch(\Exception $e ) {

			$this->log("Exception : pas de proxy disponible => population de l'entrepôt");

			$this->warehouse->populate();

			try {
				
				$this->log("Recherche d'un nouveau proxy");

				$coolProxy = $this->warehouse->getNextProxy($idealConditions);

			} catch( \Exception $e ) {

				$this->log("Auncun nouveau proxy trouvé finallement");
			}

		}

		if( !isset( $coolProxy ) 
				|| 
					( null !== $previousProxy 
						&& $previousProxy->getId() === $coolProxy->getId() 
					) 
		) 
		{
			$this->log("Auncun ou seulement deux proxy");
			$command->setNextCommand(new PanicProxyCommand() );
		
		} else {
			$this->log(sprintf("Prochain proxy utilisé : %s", $coolProxy->getHost()));
			$nextCommand = new ProcessSearchCommand( $coolProxy );
			$command->setNextCommand( $nextCommand );
		}
	}

	private function log( $message ) {
		$this->logger->info( $message );
	}


}