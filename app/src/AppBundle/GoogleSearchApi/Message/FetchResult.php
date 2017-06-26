<?php

namespace AppBundle\GoogleSerchApi\Message;

use AppBundle\GoogleSerchApi\Model\Recherche;
use AppBundle\GoogleSerchApi\Model\Response;

class FetchResult {

	protected $response;
	protected $recherche;


	public function __construct( Recheche $recherche ) {
		$this->recherche = $recherche;
	}

	public function setResponse( Response $response ) {
		$this->response = $response;
	}

	public function getResponse() {
		return $this->response;
	}

	public function getRecherche() {
		return $this->recherche;
	}
}