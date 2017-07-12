<?php

namespace Bg\BgBundle\Metier\Recherche\Service;

use Bg\BgBundle\Metier\Recherche\ProxyWahereHouse;

class WaitFor {


	private $waitFor;

	public function __construct( $waitFor) {
		$this->waitFor = $waitFor;
	}

	public function second() {

	}

	private function waitProxyWareHouse() {
		$availableProxies = $this->waitFor->availableProxies();
	}
}