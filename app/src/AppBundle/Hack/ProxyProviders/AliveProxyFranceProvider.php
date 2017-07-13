<?php

namespace AppBundle\Hack\ProxyProviders;

use Goutte\Client;
use AppBundle\Entity\Proxy;

class AliveProxyFranceProvider implements ProxyProvider {

	
	protected $nodes = [];
	protected $res = [];

	protected $element = [];

	public function __construct() {

		$this->elements = ( new TableDomParser() )->getElements();
			
	}

	public function getProxies() {
		$res = [];
		foreach( $this->elements as $row ) {
			$res[] = $this->getProxy( $row );
		}
		return $res;
	}

	private function getProxy( $row ) {
		$element = array_shift( $row);
		$data = explode(':',$element->firstChild->wholeText);
		$proxy = new Proxy();
		$proxy->setHost( $data[0] );
		$proxy->setPort( $data[1] );
		return $proxy;
	}
}