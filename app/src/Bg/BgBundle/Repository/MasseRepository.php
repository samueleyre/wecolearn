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
			SELECT COUNT(DISTINCT(masse))	
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

		//syslog(LOG_ERR, $this->getPaginationQuery()->size());
		//syslog(LOG_ERR, $this->getPaginationQuery()->offset());

		$ret = 
			$this
				->em
				->createQuery( $query )
				//->setMaxResults( $this->getPaginationQuery()->size() )
				//->setFirstResult($this->getPaginationQuery()->offset())
				->getResult()
		;
		syslog(LOG_ERR,count($ret));
		return $ret;
	}
}