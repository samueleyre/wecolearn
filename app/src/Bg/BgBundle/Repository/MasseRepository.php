<?php

namespace Bg\BgBundle\Repository;

use AppBundle\Pagination\PaginationTrait;

class MasseRepository {

	use PaginationTrait;
	
	public function __construct( $em ) {
		
		$this->em = $em;
	
	}

	public function count() {
		
		$query = "
			SELECT COUNT(masse)	
			FROM BgBundle:Masse masse 
			JOIN BgBundle:Programmation programmation
			WITH programmation.masse = masse
			WHERE programmation.used = 0
		";

		$ret = 
			$this
				->em
				->createQuery( $query )
				->getSingleScalarResult()
		;
		return $ret;
	}

	public function fetchUnused() {
		
		$query = "
			SELECT masse	
			FROM BgBundle:Masse masse 
			JOIN BgBundle:Programmation programmation
			WITH programmation.masse = masse
			WHERE programmation.used = 0
		";

		$ret = 
			$this
				->em
				->createQuery( $query )
				->setMaxResults( $this->getPaginationQuery()->size() )
				->setFirstResult($this->getPaginationQuery()->offset())
				->getResult()
		;
		return $ret;
	}
}