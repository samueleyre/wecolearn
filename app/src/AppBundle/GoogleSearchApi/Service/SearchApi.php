<?php

namespace AppBundle\GoogleSearchApi\Service;

use Goutte\Client;

class SearchApi {

	public function __construct() {

		$config = [
    		'proxy' => [
        		'http' => 'xx.xx.xx.xx:8080'
        	]
    	];
		$this->client = new Client();
		//$this->client->setClient(new \GuzzleHttp\Client($config));

	}

	public function get( $q, $index = 0 ) {
		
		$query = sprintf( 'https://www.google.com/search?q=%s&start=%d', urlencode($q), 10 * $index );

		$ret = [];

		$crawler = $this->client->request('GET', $query );

		$crawler->filter('h3.r a')->each(function ( $node ) use ( &$ret ) {
			 $res = $this->matchUrl($node->getNode(0)->getAttribute('href'));
			 $ret[] = $res;
		});
		return $ret;
	}

	protected function matchUrl( $element ) {
		$ret = null;
		if( preg_match('/(http(|s):\/\/([^\/]*?))\//', $element, $match) ) {
			$ret =  $match[1];
		}
		return $ret;
	}
}