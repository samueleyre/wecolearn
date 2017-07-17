<?php

namespace Bg\BgBundle\Metier\Recherche;

use AppBundle\Hack\ProxyWareHouses\AbstractProxyWareHouse;

use Symfony\Component\DependencyInjection\ContainerInterface as Container;
use AppBundle\Hack\ProxyProviders\AliveProxyFranceProvider;
use AppBundle\Hack\ProxyProviders\ProxyFranceProvider;
use AppBundle\Env\Manager as Env;
use AppBundle\Hack\State\GoogleSetter;
            


class ProxyWareHouse extends AbstractProxyWareHouse {

	public function __construct( $em, $logger ) {
		
		parent::__construct( $em, $logger );

		// providers.
		$providers = [
			new ProxyFranceProvider(),
			new AliveProxyFranceProvider(),
		];
		foreach( $providers as $provider ) {
			$this->addProxyProvider( $provider );
		}
		//setters.
		$setter = new GoogleSetter( $em, $logger );
		$this->addStateSetter( $setter );
		$this->populate();
	}
}