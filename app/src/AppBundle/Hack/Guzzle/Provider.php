<?php

namespace AppBundle\Hack\Guzzle;

use AppBundle\Entity\Proxy;

class Provider {

	public static function get( Proxy $proxy ) {
		$protocole = sprintf('http%s', $proxy->getSecure()?'s':'');
		$host = sprintf('%s:%s', $proxy->getHost(), $proxy->getPort());

		$config = [
    		'proxy' => [
        		$protocole => $host,
        	],
        	'connect_timeout' => 6
    	];

    	return new \GuzzleHttp\Client( $config );
	}
}