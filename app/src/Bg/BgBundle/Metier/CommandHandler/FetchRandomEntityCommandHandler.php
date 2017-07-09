<?php

namespace Bg\BgBundle\Metier\CommandHandler;

use Bg\BgBundle\Metier\Command\FetchRandomEntity;
use Doctrine\ORM\Query\ResultSetMappingBuilder;


class FetchRandomEntityCommandHandler {

	private $em;

	public function __construct( $em ) {
		$this->em = $em;
	}

	public function handle(FetchRandomEntity $command ) {

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
		$sep = 'AND';
		foreach( $conditions as $key => $value ) {
			$cond .= sprintf(" %s entity.%s = '%s' ", $sep , $key , $value );
			$sep = 'AND';
		}

		$condInWhere = '';
		$sep = 'Where';
		foreach( $conditions as $key => $value ) {
			$condInWhere .= sprintf(" %s %s = '%s' ", $sep , $key , $value );
			$sep = 'AND';
		}
		/*
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
		*/
		
		
		$rsm = new ResultSetMappingBuilder( $this->em );
		$rsm->addRootEntityFromClassMetadata(get_class( $entity ), 'entity');

		$table = $this->em->getClassMetadata(get_class($entity))->getTableName();


		$query = sprintf(
			"SELECT *
  			 FROM %s entity JOIN
       			(SELECT CEIL(RAND() *
                     (SELECT MAX(id)
                        FROM %s %s)) AS randid)
        	 AS r2
			 WHERE entity.id >= r2.randid %s
			 ORDER BY entity.id ASC
			 LIMIT 1
			", $table, $table, $condInWhere, $cond );

		$query = $this->em->createNativeQuery($query, $rsm);

		return $query->getSingleResult();
		

		$q = $this->em->createQuery($query);
		$iterableResult = $q->iterate();
		$index = 1;
		$ret = null;
		while (($row = $iterableResult->next()) !== false) {
		    //if( $index == $rand ) {
		    	$ret = $row[0];
		    	
		    //} else {
		    //	$this->em->detach($row[0]);		
		    //}
		    $index ++;
		}
		return $ret;
	}
}