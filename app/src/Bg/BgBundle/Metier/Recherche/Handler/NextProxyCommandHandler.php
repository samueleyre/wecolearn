<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Command\FetchProxyCommand;
use Bg\BgBundle\Metier\Recherche\Command\CriticCommand;
use Bg\BgBundle\Metier\Recherche\Command\ProcessSearchCommand;



class NextProxyCommandHandler {

	public function __construct( $proxyWahreHouse, $logger ) {
		$this->warehouse = $proxyWahreHouse;
		$this->logger = $logger;
	}

		
	public function handle(FetchProxyCommand $command ) {

		$coolProxy = null;
		
		$idealConditions = ['donw' => 0, 'gBlaklisted' => 0 ];
		
		$this->log("Recherche d'un nouveau proxy");
		
		try {
			
			$coolProxy = $this->warehouse->getNextProxy($idealConditions);
		
		} catch(\Exception $e ) {

			$this->log("Exception : pas de proxy disponible => population de l'entrepôt");

			$this->warehouse->populate();

			try {
				
				$this->log("Recherche d'un nouveau proxy");

				$coolProxy = $this->warehouse->getNextProxy($idealCondition);

			} catch( \Exception $e ) {

				$this->log("Auncun nouveau proxy trouvé finallement");
			}

		}

		if( !isset( $coolP ) 
				|| 
					( null !== $previousProxy 
						&& $previousProxy->getId() === $coolP->getId() 
					) 
		) 
		{
			$this->log("Auncun ou seulement deux proxy");
			$command->setNextCommand(new PanicProxyCommand() );
		
		} else {
			$this->log(sprintf("Prochain proxy utilisé : %s", $coolP->getHost()));
			$nextCommand = new ProcessSearchCommand( $coolProxy );
			$command->setNextCommand( $nextCommand );
		}
	}

	private function log( $message ) {
		$this->logger->info( $message );
	}


}