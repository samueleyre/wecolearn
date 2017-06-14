<?php

namespace Bg\BgBundle\Service;

use AppBundle\Pagination\PaginationTrait;
use AppBundle\Pagination\PaginationInterface;
use Doctrine\ORM\EntityManager;

use Bg\BgBundle\Entity\ModelInteface as Model;

class GPPDService implements PaginationInterface {

	use PaginationTrait;
	
	private $em;
	
	public function __construct( EntityManager $em ) {
		$this->em = $em;
	
	}

	public function setEntityRef( $entityRef ) {
		$this->entityRef = $entityRef;
		return $this;
	}

	public function get() {
		$query = sprintf("SELECT entity FROM %s entity", $this->entityRef );

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

	public function getAll() {
		
		$query = sprintf("SELECT entity FROM %s entity", $this->entityRef );

		$ret = 
			$this
				->em
				->createQuery( $query )
				->getResult()
		;
		return $ret;		
	}

	public function count() {
		
		$qb = $this->em->createQueryBuilder();
		$qb->select('count(entity.id)');
		$qb->from(sprintf('%s', $this->entityRef ),'entity');

		return $qb->getQuery()->getSingleScalarResult();

		
	}

	private function findById( $id ) {
		$query = sprintf("SELECT b FROM %s b WHERE b.id = %d ", $this->entityRef, $id);
		return 
			$this
				->em
				->createQuery( $query)
				->setMaxResults(1)
				->getSingleResult()
		;
	}

	public function patch( $entity ) {

		$this->em->merge( $entity );
		$this->em->flush();
		return $this;
	
	}

	public function post( $entity ) {
		
		$this->em->persist( $entity );
		$this->em->flush();
		return $this;
	
	}
	
	public function delete( $id ) {
		
		$entity = $this->findById( $id );
		$this->em->remove(  $entity );
		$this->em->flush();
		return $this;
	}
}