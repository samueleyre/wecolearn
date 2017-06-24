<?php

namespace Bg\BgBundle\Metier\CommandHandler;

use Bg\BgBundle\Metier\Command\FetchEntity;

class FetchRandomEntityCommandHandler {

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
		$sep = '';
		foreach( $conditions as $key => $value ) {
			$cond .= sprintf(" %s entity.%s = '%s' ", $sep , $key , $value );
			$sep = 'AND';
		}
		$query = sprintf(
			"SELECT COUNT(entity) 
			FROM %s entity 
			WHERE %s", get_class( $entity), $cond );

		$count =  
			$this
				->em
				->createQuery( $query )
				->getSingleScalarResult()
		;
		
		$rand = rand(1, $count );

		$query = sprintf(
			"SELECT entity 
			FROM %s entity 
			WHERE %s", get_class( $entity), $cond );

		

		$q = $this->em->createQuery($query);
		$iterableResult = $q->iterate();
		$index = 1;
		$ret = null;
		while (($row = $iterableResult->next()) !== false) {
		    if( $index == $rand ) {
		    	$ret = $row[0];
		    	
		    } else {
		    	$this->em->detach($row[0]);		
		    }
		    $index ++;
		}
		return $ret;
	}
}