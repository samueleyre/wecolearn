<?php

namespace Bg\BgBundle\Metier\Recherche\Service;

use Bg\BgBundle\Metier\Recherche\ProxyWahereHouse;

use AppBundle\Persist\File\Store;

class WaitFor {


	protected $command;
	protected $waitFor;

	public function __construct( $command , $waitFor = 'd' ) {
		
		$this->command = $command;
		$this->waitFor = $waitFor;
		$this->store = self::getStore();

	}

	public function wait() {
		$this->store->put( $this->serialize( $this->command ) );
		$ret = $this->at( $this->nextTimestamp($this->waitFor) );
	}

	public static function getStore() {
		return new Store(__DIR__.'/../data/', 'wait_for');
	}

	public static function nextCommand() {
		$serialised = self::getStore()->get();
		$unserialized = @unserialize( $serialised );
		if( ! is_array( $unserialized)) {
			return null;
		} else {
			return new $unserialized['class'];	
		}
	}

	private function at( $timestamp ) {
		
		$at = new At();
		$at->postPone($timestamp,'/src/script/at-rank');

	}

	private function nextTimestamp( $waitFor ) {
		$now = time();
		switch( $waitFor ) {
			case 'd';
			
				$add = 24 + 3600;

			break;
			default;
				$add = 3600;
			break;
		}
		$then = $now + $add;

		return $this->prochainTimestampDeRechercheHumain( $then );

	}

	// TODO , should be in a google hack class, so the generation of test search phrase.
	private function prochainTimestampDeRechercheHumain( $timestamp ) {

		$h = date('H', $timestamp);

		$startBureau = 8;
		$endBureau = 10;
		$startHome = 18;
		$endHome = 22;

		if( $h < $startBureau ) {
			$moreH = ($startBureau - $h); 
		} else if( $h >= $startBureau && $h < $endBureau ) {
			$moreH = 0;
		} elseif( $h >= $endBureau && $h < $startHome ) {
			$moreH = $startHome;
		} elseif( $h >= $startHome && $h < $endHome ) {
			$moreH = 0;
		} else {
			$more =  ( 24 - $h ) + $startBureau; // l'heure de bureau le jour suivant. 
			// si il est 23 h je rajoute une heure pour recommencer la journée.
		}

		$add = $moreH * 3600 + rand( 17*58 , 23 * 57 ); 
		// on se place aux heure de bureaux, et on rajoute une part d'aléatoire entre 17 et 23 ~minutes.
		return $timestamp + $add;
	}

	private function serialize( $command ) {
		return serialize(['class' => get_class( $command )]);
	}
}