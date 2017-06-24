<?php

namespace Bg\BgBundle\Repository;

class ProgrammationRepository {

	public function __construct( $em ) {
		
		$this->em = $em;
	
	}

	public function fetchUnUsedForClient( $idClient ) {
		
		$query = sprintf("
			SELECT programmation	
			FROM BgBundle:Programmation programmation 
			WHERE programmation.idClient = %s AND programmation.used = 0
		", $idClient);

		$ret = 
			$this
				->em
				->createQuery( $query )
				->getResult()
		;
		return $ret;
	}

	public function fetchById( $id ) {
		
		$query = sprintf("
			SELECT programmation	
			FROM BgBundle:Programmation programmation 
			WHERE programmation.id = %d
			", $id);

		$ret = 
			$this
				->em
				->createQuery( $query )
				->setMaxResults(1)
				->getSingleResult()
		;
		return $ret;
	}
}