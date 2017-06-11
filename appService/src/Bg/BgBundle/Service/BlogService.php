<?php

namespace Bg\BgBundle\Service;

use AppBundle\Pagination\PaginationTrait;
use AppBundle\Pagination\PaginationInterface;
use Doctrine\ORM\EntityManager;

class BlogService implements PaginationInterface {

	use PaginationTrait;
	
	private $em;
	
	public function __construct( EntityManager $em ) {
		$this->em = $em;
	}

	
	public function get() {
		$query = "SELECT b FROM BgBundle:Blog b";

		return 
			$this
				->em
				->createQuery( $query )
				->setMaxResults( $this->getPaginationQuery()->size() )
				->setFirstResult($this->getPaginationQuery()->offset())
				->getResult()
		;

	}

	public function count() {
		
		$qb = $this->em->createQueryBuilder();
		$qb->select('count(b.id)');
		$qb->from('BgBundle:Blog','b');

		return $qb->getQuery()->getSingleScalarResult();

		
	}
}

