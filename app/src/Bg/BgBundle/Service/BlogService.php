<?php

namespace Bg\BgBundle\Service;

use AppBundle\Pagination\PaginationTrait;
use AppBundle\Pagination\PaginationInterface;
use Doctrine\ORM\EntityManager;

use Bg\BgBundle\Entity\Blog;

class BlogService implements PaginationInterface {

	use PaginationTrait;
	
	private $em;
	
	public function __construct( EntityManager $em ) {
		$this->em = $em;
	}

	
	public function get() {
		$query = "SELECT b FROM BgBundle:Blog b";

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

	public function count() {
		
		$qb = $this->em->createQueryBuilder();
		$qb->select('count(b.id)');
		$qb->from('BgBundle:Blog','b');

		return $qb->getQuery()->getSingleScalarResult();

		
	}

	private function findById( $id ) {
		$query = sprintf("SELECT b FROM BgBundle:Blog b WHERE b.id = %d ", $id);
		return 
			$this
				->em
				->createQuery( $query)
				->setMaxResults(1)
				->getSingleResult()
		;
	}

	public function patch( Blog $blog) {

		$this->em->merge( $blog );
		$this->em->flush();
		return $this;
	
	}

	public function post( Blog $blog ) {
		
		$this->em->persist( $blog );
		$this->em->flush();
		return $this;
	
	}
	
	public function delete( $id ) {
		
		$blog = $this->findById( $id );
		$this->em->remove(  $blog );
		$this->em->flush();
		return $this;
	}
}