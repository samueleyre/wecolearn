<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Command\NextProxyCommand;
use Bg\BgBundle\Metier\Recherche\Command\EndCommand;

use Bg\BgBundle\Metier\Recherche\Command\PanicProxyCommand;

use AppBundle\GoogleSearchApi\Service\SearchApi;

use AppBundle\Env\Manager as Env;

use AppBundle\Hack\State\GoogleSetter;

// nota sur le model de donnée : 

/*
	le proxy est par defaut up et sans état de blacklisted
	les proxy doivent être testés au moment ou il sont peuplés
	une fois test
		- down B~null
		- up B
		- up !B

*/


class PanicProxyCommandHandler { 

	public function __construct( $em , $logger, $messenger ) {

		$this->em = $em;
		$this->logger = $logger;
		$this->messengerManager = $messenger;
		$this->googleSetter = new GoogleSetter( $em, $logger );
	
	}

	public function handle( PanicProxyCommand $command ) {

		$this->log("Proxy Panic");

		$rapport = $this->googleSetter->process();

		$rapport['total'];
		$rapport['unavailable'];
		$rapport['down'];
		$rapport['upB'];
		$rapport['upNotB'];

		if( $rapport['total'] !== $rapport['unavailable'] && ( $rapport['total'] !== ( $rapport['unavailable'] + 1 ) ) ) {
			throw new \LogicException("Pas de proxy Panic : plus d'un proxy accessibles");
		}

		$success = $rapport['upNotB'] > 0;



		if( $success ) {
           $this->log(sprintf("%s proxy ont été rétablit", $success));
           $nextCommand = new NextProxyCommand();
           $command->setNextCommand( $nextCommand );
	    } else {
           $this->log(sprintf("Aucun proxy rétablit", $success ));
           $this->warning( $rapport['total'],$rapport['down'],$rapport['upB'] );
           $nextCommand = new EndCommand();
           $command->setNextCommand( $nextCommand );
	    }
	}

	private function warning( $total, $down, $blacklisted ) {
		
		$message = $this->messengerManager->getMessage();
		
		$partner = [ 'edouard.touraille@gmail.com' => 'Edouard Touraille'];
		if( Env::getEnv() === Env::PRODUCTION ) {
			$boss = ['jc.ambrieu@gmail.com' => 'Jean-Claude Ambrieu'];
		} else {
			$boss = [];
		}

		$recipients = array_merge( $boss, $partner );

		$message->setTo( $recipients );
		$message->setFrom(['edouard.touraille@gmail.com' =>'Blog Generator']);
		$content = sprintf(
			"L'évolution des rank des recherche n'est plus calculable\n
			Il n'y a plus de proxy disponible pour les recherche dans l'entrepôt\n
			sur %s proxy\n
			%s ne sont pas accessibles\n
			%s sont accesible mais blacklistés par google\n
			", $total, $down, $blacklisted );
		$message->setContent( $content );
		$message->setSubject('Proxy Panic');

		$this->messengerManager->addMessage($message);
		$this->messengerManager->flush();
		
	}

	public function log( $message ) {

		$this->logger->info( $message );
	
	}
}