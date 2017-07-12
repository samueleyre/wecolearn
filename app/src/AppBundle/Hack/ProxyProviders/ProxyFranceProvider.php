<?php

namespace AppBundle\Hack\ProxyProviders;

use Goutte\Client;
use AppBundle\Entity\Proxy;

class ProxyFranceProvider implements ProxyProvider {

	
	protected $nodes = [];
	protected $res = [];

	public function __construct() {

		$this->client = new Client();
		$this->url = 'http://proxygaz.com/fr/country/proxy-france/';
		$this->_setResults();
	}

	private function _setResults() {

		$ret = [];
		
		$crawler = $this->client->request('GET', $this->url );

		$crawler->filter('div.plbc_bloc_proxy table tr.plbc_bloc_proxy_tr td')->each( function ( $node ) use ( &$ret ) {
			 	$this->addDomElement( $node->getNode(0) );
		});
	}

	private function addDomElement( $nodeElement ) {
		$this->nodes[] = $nodeElement;

		if(5 == count( $this->nodes)) {
			$this->processNodes( $this->nodes );
			$this->nodes = [];
		}
	}

	private function processNodes( $nodes ) {
		
		$proxy = new Proxy();
		$proxy->setHost($this->getHost( $nodes[0]));
		$proxy->setPort( $this->getPort( $nodes[1]));
		$proxy->setSecure( $this->getSecure( $nodes[2]));

		$this->ret[] = $proxy;

	}

	private function getHost( $node ) {
		$ret = null;
		if(preg_match('/"(.*?)"\)\)/',$node->firstChild->firstChild->wholeText, $match) ) {
			$ret = base64_decode($match[1]);
		}
		return $ret;
	}

	private function getPort( $node ) {
		return $node->firstChild->wholeText;
	}

	private function getSecure ( $node ) {
		return 'https' === $node->firstChild->wholeText;	
	}

	public function getProxies() {
		return $this->ret;
	}
}