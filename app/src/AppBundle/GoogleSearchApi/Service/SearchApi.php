<?php

namespace AppBundle\GoogleSearchApi\Service;

use AppBundle\GoogleSearchApi\Exception\BlackListException;

use Goutte\Client;

class SearchApi {

	const GOOGLE_RESULT_PER_PAGE = 10;

	public function __construct( $proxy , $logger ) {

		$this->logger = $logger;

		$protocole = sprintf('http%s', $proxy->getSecure()?'s':'');
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
			
			$this->logger->info(sprintf("Recherche : % sur la page : %s", $recherche, $page +1 ));
			
			$url = $this->removeLastSlash($url);
			$urls = $this->get( $recherche, $page );
			dump( $urls );
			if( count( $urls ) === 0 ) throw new BlackListException(); 
			$match = array_search( $url, $urls );
			if( $match !== false ) $ret = $match + 1 + $page * self::GOOGLE_RESULT_PER_PAGE;
			
			$page ++;
		
		}
		
		return $ret;
	}

	public function test() {
		
		$search = sprintf('no%s des caravel%s%s de %shristo%s colo%s',
			rand(0,1)?'ms':'ns',
			rand(0,1)?'l':'',
			rand(0,1)?'s':'',
			rand(0,1)?'C':'c',
			rand(0,1)?'f':'phe',
			rand(0,1)?'n':'mb'
		);

		$res = count( $this->get( $search , 0, false ) );

		$this->logger->info(sprintf("Recherche de test : %s : %s resultat%s sur la premiere page", $search, $res, count($res)>=2?'s':''));

		return $res > 0;
	}

	private function get( $q, $index = 0 , $sleep = true ) {
		
		$query = sprintf('https://www.google.com/search?q=%s&start=%d', urlencode($q), 10 * $index );

		$ret = [];

		$rankToClick = rand(0,9);
		$urlToClick = null;

		$crawler = $this->client->request('GET', $query );

		$crawler->filter('h3.r a')->each(function ( $node ) use ( &$ret, $rankToClick, &$urlToClick ) {
			 $res = $this->matchUrl( $url = $node->getNode(0)->getAttribute('href') );
			 $ret[] = $this->removeLastSlash($res);
			 if( isset( $res) && $rankToClick == count($ret) ) {
			 	$urlToClick = $url;
			 }
		});

		if(isset( $urlToClick)) {
			$this->clickOnLink( $crawler, $urlToClick );
		}

		// WE SLEEP For microtime randomly entre 5 Et 17 secondes.
		if( $sleep  && count($ret) > 0 ) {
			$sleepTime = ( rand( 5, 17 ) + rand(5,7) * $index ) * 1000;
			// on prends 5 à 7 secondes par index.
			usleep( $sleepTime);
			$this->logger->info(sprintf("Google Search : Pause d'un tout petit peu moins de % secondes", ceil($sleepTime/1000)));
			// TODO clik on a random link.

		}

		return $ret;
	}

	private function clickOnLink( $crawler, $url ) {
		$link = $crawler->filter(sprintf('a[href="%s"]', $url ))->link();
		$this->client->click( $link );
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