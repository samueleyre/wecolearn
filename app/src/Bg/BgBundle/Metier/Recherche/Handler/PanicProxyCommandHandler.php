<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Command\NextProxyCommand;
use Bg\BgBundle\Metier\Recherche\Command\EndCommand;

use Bg\BgBundle\Metier\Recherche\Command\PanicProxyCommand;

use AppBundle\GoogleSearchApi\Service\SearchApi;


class PanicProxyCommandHandler { 

	public function __construct( $em , $logger ) {

		$this->messengerManager = new \AppBundle\Messenger\Manager();
		$this->em = $em;
		$this->logger = $logger;
	
	}

	public function handle( PanicProxyCommand $command ) {

		$this->log("Proxy Panic");

		$success = 0;
		$query = "
			SELECT proxy 
			FROM AppBundle:Proxy proxy
			WHERE proxy.down = 1
			"
		;
		
		$proxies = 
			$this
				->em
				->createQuery( $query )
				->getResult()
			;

		$down = count($proxies);

		$this->log(sprintf("%s proxy down", $down));

		foreach( $proxies as $proxy ) {

			if( ! $this->isDown( $proxy ) ) {
				dump(1);
				$success++;
			}
		}

		$query = "
			SELECT proxy 
			FROM AppBundle:Proxy proxy
			WHERE proxy.gBlacklisted = 1
			"
		;
		
		$proxies = 
			$this
				->em
				->createQuery( $query)
				->getResult()
			;

		$blacklisted = count( $proxies );

		$this->log(sprintf("%s proxy blacklisté", $blacklisted));

		foreach( $proxies as $proxy ) {

			if( ! $this->isBlacklisted( $proxy )) {
				$success++;
			}
		}

		if( $success > 0 ) {
			$this->log(sprintf("%s proxy ont été rétablit", $success));
			$nextCommand = new NextProxyCommand();
			$command->setNextCommand( $nextCommand );
		} else {
			$this->log(sprintf("Aucun proxy rétablit", $success ));
			$this->warning($down, $blacklisted );
			$nextCommand = new EndCommand();
			$command->setNextCommand( $nextCommand );
		}
	}

	private function warning( $down, $blacklisted ) {
		
		$message = $this->messengerManager->getMessage();
		$message->setTo([
				'edouard.touraille@gmail.com'
					=> 
				'Edouard Touraille',
				'jc.ambrieu@gmail.com'
					=> 
				'Jean-Claude Ambrieu'
				]);
		$message->setFrom(['bot@xyz.com' =>'Blog Generator']);
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
	 
		$curl = new \Curl\Curl();
		$curl->setOpt(CURLOPT_PROXY, TRUE);
		$curl->get('http://www.google.fr');

		if ($curl->error) {
	    	$isDown = true;
		}	else {
	    	$isDown = false;
		}

		if(  ! $isDown ) {
			$proxy->setDown(0);
			$this->em->merge( $proxy );
			$this->em->flush();
		}

		return $isDown;
	}

	private function isBlacklisted ( $proxy ) {
		
		$search = new SearchApi($proxy, $this->logger );

		try {

			$isNotBlacklisted = $search->test();

				
		} catch(\GuzzleHttp\Exception\ConnectException $e ) {

			// Le proxy ne réponds pas, dans le doute
			// on le deblakliste.
			// ce qui permet de 
				// - le persister
				// - avoir un état 1 - 0, 0 - 1, ou 0 - 0 uniquement.
			$isNotBlacklisted = true;
			$proxy->setDown(1);
		}
		
		
		if( $isNotBlacklisted ) {
			
			dump( $isNotBlacklisted );

			$proxy->setGBlacklisted(0);
			$this->em->merge( $proxy );
			$this->em->flush();
		}

		//dump( $res );

		return  ! $isNotBlacklisted;
	}

	public function log( $message ) {

		$this->logger->info( $message );
	
	}
}