<?php

namespace Bg\BgBundle\Service;

use AppBundle\Pagination\Trait as PaginationTrait;
use AppBundle\Pagination\Interface as PaginationInterface;
use Doctrine\ORM\EntityManager;

class BlogService implements PaginationInterface {

	use PaginationTrait;
	
	private $em;
	
	public function __construct( EntityManager $em ) {
		$this->em = $em;
	}

	
	public function get() {
		$query = sprint(
			"SELECT FROM BgBundle:Blog LIMIT %d, %d",
			 	$this->getPaginationQuery()->start(),
			 	$this->getPaginationQuery()->size()
			)
		;

		return 
			$this
				->em
				->createQuery( $query )
				->getResult()
		;

	}

	public function count() {
		return 
			$this
				->em
				->createQuery('SELECT COUNT(*) as N FROM BgBundle:Blog')
				->getSingleResult()
		;
	}
}

