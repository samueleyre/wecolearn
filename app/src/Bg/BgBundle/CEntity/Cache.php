<?php

namespace Bg\BgBundle\CEntity;

class Cache {

	protected $class;
	protected $id;
	
	public function __construct( $entity, $em ) {

		$this->class = get_class( $entity );
		$this->id = $entity->getId();
		$this->em = $em;
		$this->em->detach( $entity );
	}

	public function __get( $var ) {
		
		$entity = $this->fetch();
		$ret = $entity->$var;
		$this->em->detach( $entity );
		return $ret;
	
	}

	public function __call( $method, $args ) {
		
		$entity = $this->fetch();
		$ret = call_user_func_array([ $entity,$method], $args );
		$this->em->detach( $entity );
		return $ret;
	
	}

	public function fetch() {
		$query = sprintf("SELECT entity FROM %s entity WHERE entity.id = %s", $this->class, $this->id);
		return $this->em->createQuery( $query )->getSingleResult();
	}

	public function getClass() {
		return $this->class;
	}
}