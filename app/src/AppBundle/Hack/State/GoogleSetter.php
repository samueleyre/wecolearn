<?php

namespace AppBundle\Hack\State;

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
			
			switch ( $state ) {
				case self::down: 
					$down ++;
				break;

				case self:upB;
					$upB ++;
				break;

				case self:upNotB;
					$upNotB ++;
				break;

				default :
					throw new \LogicException('Unknow state %s', $state );
				break;
			}
		}

		$message = sprintf('%s proxy down, %s proxy up and blacklisted, %s proxy availables', $down, $upB, $upNotB );

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

	}

	private function isDown( $proxy ) {
	 
		$curl = new \Curl\Curl();
		$host = sprintf('%s:%s', $proxy->getHost(), $proxy->getPort());
		$curl->setOpt(CURLOPT_PROXY, $host);
		$curl->setOpt(CURLOPT_TIMEOUT,2);
		$curl->setOpt(CURLOPT_HTTPPROXYTUNNEL, 0);
		$curl->setOpt(CURLOPT_FOLLOWLOCATION, 1);
		//$curl->setOpt(CURLOPT_RETURNTRANSFER, 0);
		$curl->get('https://www.google.fr');

		if ( $curl->error) {
	    	$isDown = true;
		}	else {
	    	$isDown = false;
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
		return $iB;
	}

	public function log( $message ) {

		$this->logger->info( $message );
	
	}
}