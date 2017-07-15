<?php

namespace Bg\BgBundle\Metier\Recherche\Service;

use AppBundle\Persist\File\Store;

class SuccessCycle {

	private $store;
	private $em;

	public function __construct( $em ) {
		$this->em = $em;
		$this->store = new Store( __DIR__.'/../data/', 'success_cycle' );
	}

	private function get() {
		$string = $this->store->get();
		if(!$string) return 0;
		else return (integer) $string;
	}

	public function cycle() {
		$isOver = false;
		$current = (int) $this->store->get();
		$current ++;
		if( $current > $this->_maxCycle()) {
			$current = 0;
			$isOver = true;
		}
		$this->store->put( $current);
		return $isOver;
	}

	private function _maxCycle() {
		$query = "SELECT COUNT(recherche) FROM BgBundle:Recherche recherche ";
		$ret = $this->em->createQuery( $query)->getSingleScalarResult();
		return $ret;
	}


}