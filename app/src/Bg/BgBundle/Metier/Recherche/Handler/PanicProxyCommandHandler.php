<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Command\FetchProxyCommand;
use Bg\BgBundle\Metier\Recherche\Command\ProcessSearchCommand;
use Bg\BgBundle\Metier\Recherche\Command\EndCommand;

use AppBundle\GoogleSearchApi\Service\SearchApi;


class PanicProxyCommandHandler { 

	public function __construct( $em , $logger ) {

		$this->messengerManager = new \AppBundle\Messenger\Manager();
		$this->em = $em;
	
	}

	public function handle( PanicProxyCommand $command ) {

		$success = 0;
		$query = "
			SELECT proxy 
			FROM AppBundle:Proxy proxy
			WHERE proxy.down = 0
			"
		;
		
		$proxies = 
			$this
				->em
				->createQuery( $query )
				->getResult()
			;

		$down = count($proxies);

		foreach( $proxies as $proxy ) {

			if( ! $this->isDown( $proxy ) ) {
				$success++;
			}
		}

		$query = "
			SELECT proxy 
			FROM AppBundle:Proxy proxy
			WHERE proxy.gBlaklisted = 0
			"
		;
		
		$proxies = 
			$this
				->em
				->createQuery( $query)
				->getResult()
			;

		$blacklisted = count( $proxies );

		foreach( $proxies as $proxy ) {

			if( ! $this->isBlacklisted( $proxy )) {
				$success++;
			}
		}

		if( $success > 0 ) {
			$nextCommand = new ProcessSearchCommand();
			$command->setNextCommand( $nextCommand );
		} else {
			$this->warning($down, $blacklisted );
			$nextCommand = new EndCommand();
			$command->setNextCommand( $nextCommand );
		}
	}

	private function warning( $down, $blacklisted ) {
		
		$message = $this->messengerManager->getMessage();
		$message->addTo(['edouard.touraille@gmail.com'=> 'Edouard Touraille']);
		$message->addTo(['jc.ambrieu@gmail.com'=> 'Jean-Claude Ambrieu']);
		$message->addFrom(['bot@xyz.com', 'Blog Generator']);
		$content = sprintf(
			"L'évolution des rank des recherche n'est plus calculable\n
			Il n'y a plus de proxy disponible pour les recherche dans l'entrepôt\n
			%s ne sont pas accessibles\n
			%s sont blacklistés par google\n
			", $down, $blacklisted );
		$message->setContent( $content );
		$message->setSubject('Proxy Panic');
		$this->messengerManager->addMessage($message);
		$this->messengerManager->flush();
		
	}

	private function isDown( $proxy ) {
	 
		$curl = new Curl\Curl();
		$curl->setOpt(CURLOPT_PROXY, TRUE);
		$curl->get('http://www.google.fr');

		if ($curl->error) {
	    	$res = false;
		}	else {
	    	$res = true;
		}

		if( $res ) {
			$proxy->setDown(0);
			$this->em->merge( $proxy );
			$this->em->flush();
		}

		return $res;
	}

	private function isBlacklisted ( $proxy ) {
		
		$search = new SearhApi($proxy);

		$res = $search->test();

		if( $res ) {
			$proxy->setGBlacklisted(0);
			$this->em->merge( $proxy );
			$this->em->flush();
		}

		return $res;
	}
}