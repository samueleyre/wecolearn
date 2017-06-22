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
			WHERE programmation.idClient = %s AND used = 0
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
			WHERE prgrammation.id = %s
			LIMIT 1
		", $id);

		$ret = 
			$this
				->em
				->createQuery( $query )
				->getSingleResult()
		;
		return $ret;
	}
}