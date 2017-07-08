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

	public function fetchAlive( $state = 1 ) {
		$query = sprintf("
			SELECT blog	
			FROM BgBundle:Blog blog
			JOIN BgBundle:BlogState blogState
			WITH blog.id = blogState.idBlog
			WHERE blogState.state = %d
		", $state ? 1 : 0 );

		$ret = 
			$this
				->em
				->createQuery( $query )
				->getResult()
		;
		return $ret;	
	}
}