<?php

namespace AppBundle\Hack\Service;

use Goutte\Client;


class AliveProxy {

	public static function test( $proxy ) {

		$protocole = sprintf('http%s', $proxy->getSecure()?'s':'');
		$host = sprintf('%s:%s', $proxy->getHost(), $proxy->getPort());

		$config = [
    		'proxy' => [
        		$protocole => $host,
        	],
        	'connect_timeout' => 3
    	];
    	
		$client = new Client();
		$client->setClient( new \GuzzleHttp\Client($config));

		$crawler = $client->request('GET', 'https://www.google.fr' );
		$crawler->filter('h1')->each( function( $node ) {
			dump( $node );
		});
	}
}
