<?php

namespace ApplicationService;

class Repositories {

	private $entityManager;

	public function __construct( $entityManager ) {

		$this->entityManager = $entityManager;
	}

	public function fetchOne( $entity ) {

		$table = $this->getTable( $entity );

		$where = '';
		$and = '';

		$reflect = new \ReflectionClass( $entity );
		$props   = $reflect->getProperties(ReflectionProperty::IS_PUBLIC );

		foreach( $props as $prop ) {
			if( isset($prop->getValue())) {
				$where .= $and . sprintf(" %s = '%s' ", 
					$this
						->reposistory
						->getClassMetadata(
							get_class( $entity)
						)
						->getColumnName($props->getName()),
						$props->getValue()
					)
				;
				$and = ' AND ';	
			}
			
		}

		$dql = sprintf("SELECT * FROM %s WHERE %s LIMIT 1", $table, $where );

		$query = $this->entityManager->createQuery( $dql );

		$query->setMaxResults(1);

		$res = $query->getResult();

		if(isset($res[0])) return $res[0];
		return null;	


	}

	public function fetch( $entity ) {
		$dql = sprintf("SELECT * FROM %s", $this->getTable( $entity ) );
		$query = $this->em->creatQuery( $dql );
		return $query->getResult();
	}

	private function getTable( $entity ) {
		return $this->reposistory->getClassMetadata(get_class( $entity))->getTable();
		
	}
}