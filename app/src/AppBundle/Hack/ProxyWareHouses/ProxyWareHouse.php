<?php

namespace AppBundle\Hack\ProxyWareHouses;

use AppBundle\Hack\ProxyProviders\ProxyProvider;

interface ProxyWareHouse {

	public function addProxyProvider( ProxyProvider $provider );

	public function populate();

	public function getNextProxy( Array $filter );

}