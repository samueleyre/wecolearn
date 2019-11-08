<?php

namespace App\Persist\Memcache;

class Main {

	private $cache;

	public function __construct( $ttl = 10) {

		$servers = [];
		$servers[] = ['memcache', 11211 ];

		$this->cache = new \Memcached( 'app' );
		$this->cache->addServers( $servers );
		$this->ttl = 600;

	}

	public function set( $key, $value ) {
		$expire = $this->getExpire();
		$this->cache->set( $key, $value,  $expire );
	}

	public function get( $key ) {
		$ret = $this->cache->get( $key );
		return $ret;
	}

	private function getExpire() {
		return time() + $this->ttl;
	}
}
