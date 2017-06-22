<?php

namespace Bg\BgBundle\Repository;

class BlogRepository {

	public function __construct( $em ) {
		
		$this->em = $em;
	
	}

	public function fetchById( $id ) {
		
		$query = sprintf("
			SELECT blog	
			FROM BgBundle:Blog blog 
			WHERE blog.id = %s
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