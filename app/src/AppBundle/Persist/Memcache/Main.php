<?php

namespace AppBundle\Persist\Memcache;

class Main {

	private $cache;
	
	public function __construct( $ttl = 10) {
		
		$servers = [];
		$servers[] = ['memcached', 11211 ];
		
		$this->cache = new \Memcached('app');
		$this->cache->addServers( $servers );
		$this->ttl = 10;

	}

	public function set( $key, $value ) {
		$this->cache->set( $key, $value, $this->getExpire());
	}

	public function get( $key ) {
		return $this->cache->get();
	}

	private function getExpire() {
		return time() + $this->ttl;
	}
}