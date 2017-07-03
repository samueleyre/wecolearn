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

	public function get( $filters = []) {
		
		syslog(LOG_ERR, count($filters));
		$params = [];
		$condition = '';
		$sep = '';
		foreach( $filters as $field => $value ) {
			$condition = sprintf('%s entity.%s=:%s', $sep , $field, $field);
			$sep = " AND ";
			$params[':'.$field] = $value; 
		}
		//syslog(LOG_ERR, $query);
		$qb = $this->em->createQueryBuilder();
		$qb->select('entity');
		$qb->from(sprintf('%s', $this->entityRef ),'entity');
				
		if(count($filters) > 0 ) {
			$qb->where( $condition );
			$qb->setParameters( $params);
		}

		$qb->setMaxResults( $this->getPaginationQuery()->size() );
		$qb->setFirstResult($this->getPaginationQuery()->offset());
		


		return $qb->getQuery()->getResult();

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

	public function count( $filters = []) {
		
		$params = [];
		$condition = '';
		$sep = '';
		foreach( $filters as $field => $value ) {
			$condition = sprintf('%s entity.%s=:%s', $sep , $field, $field);
			$sep = " AND ";
			$params[':'.$field] = $value; 
		}
		$qb = $this->em->createQueryBuilder();
		$qb->select('count(entity.id)');
		$qb->from(sprintf('%s', $this->entityRef ),'entity');
		if(count($filters) > 0 ) {
			$qb->where( $condition );
			$qb->setParameters( $params);
		}


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