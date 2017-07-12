<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Command\FetchProxyCommand;
use Bg\BgBundle\Metier\Recherche\Command\CriticCommand;
use Bg\BgBundle\Metier\Recherche\Command\ProcessSearchCommand;



class FetchProxyCommand {

	public function __construct( $proxyWahreHouse ) {
		$this->warehouse = $proxyWahreHouse;
	}

		
	public function handle(FetchProxyCommand $command ) {

		$coolProxy = null;
		
		$idealConditions = ['donw' => 0, 'gBlaklisted' => 0 ];
		
		try {
			$coolProxy = $this->warehouse->getNextProxy($idealConditions);
		
		} catch(\Exception $e ) {

			$this->warehouse->populate();

			try {
				$coolProxy = $this->warehouse->getNextProxy($idealCondition);

			}

		}

		if( !isset( $coolP ) 
				|| 
					( null !== $previousProxy 
						&& $previousProxy->getId() === $coolP->getId() 
					) 
		) 
		{
			$command->setNextCommand(new PanicProxyCommand() );
			$command->continue = true;
		} else {
			$nextCommand = new ProcessSearchCommand( $coolProxy );
			$command->setNextCommand( $nextCommand );
		}
	
	}


}