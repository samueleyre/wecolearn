<?php

namespace WcBundle\Service;

use Doctrine\ORM\EntityManager;


class GPPDService {


	private $em;

	public function __construct( EntityManager $em ) {
		$this->em = $em;
	
	}

	public function setEntityRef( $entityRef ) {
		$this->entityRef = $entityRef;
		return $this;
	}

    public function get( $filters = []) {

        $params = [];
        $condition = '';
        $sep = '';
        $qb = $this->em->createQueryBuilder();
        $qb->select('entity');
        $qb->from(sprintf('%s', $this->entityRef ),'entity');


        if(count($filters) > 0 ) {
            foreach( $filters as $field => $value ) {
                $condition = sprintf('%s entity.%s=:%s', $sep , $field, $field);
                $sep = " AND ";
                $params[':'.$field] = $value;
            }
            $qb->where( $condition );
            $qb->setParameters( $params);
        }

        $ret = $qb->getQuery()->getResult();

        return  $ret;

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

	private function findBy($col, $id ) {
		$query = sprintf("SELECT b FROM %s b WHERE b.%s = %d ", $this->entityRef, $col,  $id);
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
		
		$entity = $this->findBy("id", $id );
		$this->em->remove(  $entity );
		$this->em->flush();
		return $this;
	}

	public function postOne($entity) {

        $this->em->persist( $entity );
        $this->em->flush();
        return $entity;

    }
}