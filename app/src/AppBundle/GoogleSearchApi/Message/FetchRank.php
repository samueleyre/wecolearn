<?php

namespace AppBundle\GoogleSearchApi\Message;

use AppBundle\GoogleSearchApi\Model\Recherche;
use AppBundle\GoogleSearchApi\Model\Response;

class FetchRank {

	protected $response;
	protected $recherche;


	public function __construct( Recherche $recherche ) {
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