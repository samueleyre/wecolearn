<?php

namespace Bg\BgBundle\Metier\Command;

class FetchEntity {

	public $response = [];
	protected $em;

	public function __construct( $entity, $cond = [] , $em) {
		$this->entity = $entity;
		$this->cond = $cond;
		$this->em = $em;
	}

	public function getConditions() {
		return $this->cond;
	}

	public function getEntity() {
		return $this->entity;
	}

	public function getResponse() {
		return $this->response;
	}

	public function setResponse( $response ) {
		$this->response = $response;
	}

	public function __destruct() {
		//$this->em->detach($this->response );
		//$this->em->clear();
	}
}