<?php

namespace Bg\BgBundle\Metier\Masse;

class PersistMasseCommandHandler {
	
	private $em;
	
	public function __construct( $em ) {
		$this->em = $em;
	}

	public function handle( PersistMasse $command ) {
		
		$model = $command->getModel();
		$entity = ModelToEntity::convert( $model );
		$this->em->persist( $entity );
		$this->em->flush();

		return $entity;
	
	}
}