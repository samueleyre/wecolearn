<?php

namespace Bg\BgBundle\Metier\Recherche;

use AppBundle\Hack\ProxyWhereHouses\AbstractProxyWahreHouse;

use Symfony\Component\DependencyInjection\ContainerInterface as Container;
use AppBundle\Hack\ProxyProviders\ProxyFranceProvider;

class ProxyWahereHouse extends AbstractProxyWareHouse {

	public function __construct( $em, $logger ) {
		
		parent::__construct( $em, $logger );

		//$this->addProxyProvider(new ProxyFranceProvider());

		$this->populate();
	
	}

}