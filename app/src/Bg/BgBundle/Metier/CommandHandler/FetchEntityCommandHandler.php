<?php

namespace Bg\BgBundle\Metier\CommandHandler;

use Bg\BgBundle\Metier\Command\FetchEntity;

class FetchEntityCommandHandler {

	private $em;

	public function __construct( $em ) {
		$this->em = $em;
	}

	public function handle(FetchEntity $command ) {

		$command
			->setResponse( 
				$this->getResponse(
					$command->getEntity(),
					$command->getConditions()
				)
			)
		;
		
	}

	private function getResponse( $entity , $conditions ) {

		
		$cond = '';
		$sep = 'WHERE';
		foreach( $conditions as $key => $value ) {
			$cond .= sprintf(" %s entity.%s = '%s' ", $sep , $key , $value );
			$sep = 'AND';
		}
		
		$query = sprintf(
			"
				SELECT entity 
				FROM %s entity 
				%s", 
				get_class( $entity), 
				$cond 
			)
		;

		
		$ret =  
			$this
				->em
				->createQuery( $query )
				->getResult()
		;

		return $ret;
	}
}