<?php

namespace Bg\BgBundle\Metier\Masse;

class PersistMasse {

	private $model;

	public function __construct( $model ) {
		
		$this->model = $model;
	
	}

	public function getModel() {
		
		return $this->model;
	
	}
}