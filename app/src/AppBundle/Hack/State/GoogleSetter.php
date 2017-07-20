<?php

namespace AppBundle\Hack\State;

use AppBundle\GoogleSearchApi\Service\SearchApi;
use AppBundle\Hack\Service\AliveProxy;

class GoogleSetter implements Setter {

	const down = 0; // proxy down.
	const upB = 1;	// proxy up and blacklisted.
	const upNotB = 2; // proxy up and not blacklited.
	
	public function __construct( $em, $logger ) {
		
		$this->em = $em;
		$this->logger = $logger;
	}

	public function process() {

		$query = "
			SELECT COUNT(proxy) 
			FROM AppBundle:Proxy proxy
			"
		;
		
		$total = (int)
			$this
				->em
				->createQuery( $query )
				->getSingleScalarResult()
			;


		$query = "
			SELECT proxy 
			FROM AppBundle:Proxy proxy
			WHERE proxy.down = 1 
			OR proxy.gBlacklisted = 1 
			"
		;
		
		$proxies = 
			$this
				->em
				->createQuery( $query )
				->getResult()
			;

		$unavailable = count($proxies);
		
		$this->log(sprintf("%s proxy unavailable", $unavailable));

		$down = 0;
		$upB = 0;
		$upNotB = 0;

		foreach( $proxies as $proxy ) {

			$state = $this->setConnexionState( $proxy );
			$this->em->merge( $proxy );
			$this->em->flush();
			$this->em->detach( $proxy );
			
			switch ( $state ) {
				case self::down : 
					$down ++;
				break;

				case self::upB :
					$upB ++;
				break;

				case self::upNotB :
					$upNotB ++;
				break;

				default :
					throw new \LogicException('Unknow state %s', $state );
				break;
			}
		}

		$message = sprintf('%s proxy down, %s proxy up and blacklisted, %s proxy availables', $total, $down, $upB, $upNotB );

		$this->log($message );
		
		return [
			'total' => $total,
			'unavailable' => $unavailable, 
			'down' => $down, 
			'upB' => $upB, 
			'upNotB' => $upNotB 
			]
		;
	}

	private function setConnexionState( $proxy ) {
		
		$isDown = $this->isDown( $proxy );
		$isB = null;
		if( !$isDown ) {
			$isB = $this->isBlacklisted( $proxy );
			if(!isset($isB)) $this->log('Prox was up, then down : instable proxy');
		}
		if( ! isset( $isB ) ) { 
			$isDown = true; 
		}
		$down = $isDown?1:0;
		$blacklisted = is_bool( $isB)?($isB?1:0):null;
		$proxy->setDown( $down);
		$proxy->setGBlacklisted($blacklisted);

		$up = 1 - $down;
		$open = 1 - $blacklisted;

		$state =  $up +  $up * $open;

		
		return $state;

	}

	private function isDown( $proxy ) {
	 
		$isDown = false;
		try {
			AliveProxy::test( $proxy );
		
		} catch( \Exception $e ) {
			$isDown = true;
		}
		return $isDown;
	}

	private function isBlacklisted ( $proxy ) {
		
		$search = new SearchApi($proxy, $this->logger );

		try {

			$isB = ! $search->test();

		} catch( \Exception $e ) {

			$isB = null;
		
		} 
		return $isB;
	}

	public function log( $message ) {

		$this->logger->info( $message );
	
	}
}