<?php

namespace Bg\BgBundle\Metier\Command;

class UpdateEntity {

	public $response = [];

	public function __construct( $entity, $values , $cond = [] ) {
		$this->entity = $entity;
		$this->values = $values;
		$this->cond = $cond;
	}

	public function getConditions() {
		return $this->cond;
	}

	public function getEntity() {
		return $this->entity;
	}

	public function getValues() {
		return $this->values;
	}
}