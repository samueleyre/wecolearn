<?php

namespace AppBundle\GoogleSearchApi\Service;

use AppBundle\GoogleSearchApi\Exception\BlackListException;

use Goutte\Client;

class SearchApi {

	const GOOGLE_RESULT_PER_PAGE = 10;

	public function __construct( $proxy ) {

		$protocole = sprintf('http%s', $proxi->getSecure()?'s':'');
		$host = sprintf('%s:%s', $proxy->getHost(), $proxy->getPort());

		$config = [
    		'proxy' => [
        		$protocole => $host,
        	],
        	'connect_timeout' => 3
    	];
    	
		$this->client = new Client();
		$this->client->setClient( new \GuzzleHttp\Client($config));

	}

	public function match( $url, $recherche, $maxPage = 10 ) {

		$page = 0;
		$match = false;
		$ret = false;

		while( false === $match && $page < $maxPage ) {
			
			$url = $this->removeLastSlash($url);
			$urls = $this->get( $recherche, $page);
			if( count( $urls ) === 0 ) throw new BlackListException(); 
			$match = array_search( $url, $urls );
			if( $match !== false ) $ret = $match + 1 + $page * sel::GOOGLE_RESULT_PER_PAGE;
			
			$page ++;
		
		}
		
		return $ret;
	}

	public function test() {
		
		$search = sprintf('no%s des caravel%e%s de %shristo%s colo%s',
			rand(0,1)?'ms':'ns'
			rand(0,1)?'l':'',
			rand(0,1)?'s':'',
			rand(0,1)?'C':'c',
			rand(0,1)?'f':'phe',
			rand(0,1)?'n':'mb'
		);

		$res = $this->get( $search );

		return count( $res ) > 0;
	}

	private function get( $q, $index = 0 ) {
		
		$query = sprintf('https://www.google.com/search?q=%s&start=%d', urlencode($q), 10 * $index );

		$ret = [];

		$crawler = $this->client->request('GET', $query );

		$crawler->filter('h3.r a')->each(function ( $node ) use ( &$ret ) {
			 $res = $this->matchUrl($node->getNode(0)->getAttribute('href'));
			 $ret[] = $this->removeLastSlash($res);
		});

		// WE SLEEP For microtime randomly entre 5 Et 17 secondes.
		usleep(rand( 5000, 17000 ));
		// TODO clik on a random link.

		return $ret;
	}

	
	private function matchUrl( $element ) {
		$ret = null;
		if( preg_match('/(http(|s):\/\/(.*?))&sa/', $element, $match) ) {
			$ret =  $match[1];
		}
		return $ret;
	}

	private function removeLastSlash( $string ) {
		return preg_replace('/(\/)$/', '', $string );
	}

}