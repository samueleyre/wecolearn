<?php

namespace Bg\BgBundle\Repository;

class BlogRepository {

	public function __construct( $em ) {
		
		$this->em = $em;
	
	}

	public function findById( $id ) {
		
		$query = sprintf("
			SELECT blog	
			FROM BgBundle:Blog blog 
			WHERE blog.id = %s
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