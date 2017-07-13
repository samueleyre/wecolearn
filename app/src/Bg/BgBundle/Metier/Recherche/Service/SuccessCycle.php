<?php

namespace Bg\BgBundle\Metier\Recherche\Service;

use AppBundle\Persist\File\Store;

class SuccessCycle {

	public function __constuct( $em ) {
		$this->em = $em;
		$this->store = new Store( __DIR__.'/../data/', 'success_cycle' );
	}

	public function get() {
		$string = $this->store->get();
		if(!$string) return 0;
		else return (integer) $string;
	}

	public function cycle() {
		$current = $this->store->get();
		if( $current >= $this->_maxCycle()) {
			$this->store->put(0);
			return false;
		} else {
			$this->set( $current + 1);
			return true;
		}
	}

	private function _maxCycle() {
		$query = "SELECT COUNT(recherche) FROM BgBundle:Recherche recherche ";
		return $this->em->createQuery( $query)->getSingleScalarResult();
	}


}