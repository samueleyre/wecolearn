<?php

namespace Bg\BgBundle\Metier\Recherche;

use AppBundle\Hack\ProxyWhereHouses\AbstractProxyWahreHouse;

use Symfony\Component\DependencyInjection\ContainerInterface as Container;
use AppBundle\Hack\ProxyProviders\ProxyFranceProvider;

class ProxyWahereHouse extends AbstractProxyWareHouse {

	public function __construct( $em, Container $container ) {
		
		parent::__construct( $em, $container->get('monolog.logger.proxy_wahrehouse'));

		$this->addProxyProvider(new ProxyFranceProvider());

		$this->populate();
	
	}

}