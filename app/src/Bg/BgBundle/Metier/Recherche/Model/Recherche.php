<?php

namespace Bg\BgBundle\Metier\Recherche\Model;

use AppBundle\GoogleSearchApi\Model\Recherche as IRecherche;

class Recherche implements IRecherche {

	public $recherche;
	public $url;
	
	public function __construct( $recherche = null, $url = null ) {
		$this->recherche = $recherche;
		$this->url;
	}

	public function getRecherche() {
		return $this->recherche;
	}

	public function getUrl() {
		return $this->url;
	}
}