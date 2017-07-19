<?php

namespace AppBundle\Hack\Service;

use Goutte\Client;
use AppBundle\Hack\Guzzle\Provider;


class AliveProxy {

	public static function test( $proxy ) {

		$client = new Client();
		$client->setClient( Provider::get( $proxy ));

		$crawler = $client->request('GET', 'https://www.google.fr' );
		$crawler->filter('h1')->each( function( $node ) {
			dump( $node );
		});
	}
}
