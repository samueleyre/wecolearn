<?php

namespace WcBundle\Service;

use Doctrine\ORM\EntityManager;

use AppBundle\Entity\Token;

class TokenService {

	private $em;
	
	public function __construct( EntityManager $em ) {
		$this->em = $em;
	}


    public function get( $filters = []) { // not used

        $params = [];
        $condition = '';
        $sep = '';
        $qb = $this->em->createQueryBuilder();
        $qb->select('entity');
        $qb->from(sprintf('%s', 'AppBundle:Token' ),'entity');


//        return count($filters);
        if(count($filters) > 0 ) {
            foreach( $filters as $field => $value ) {
                $condition = sprintf('%s entity.%s=:%s', $sep , $field, $field);
                $sep = " AND ";
                $params[':'.$field] = $value;
            }
            $qb->where( $condition );
            $qb->setParameters( $params);
        }

//        $qb->setMaxResults( 5 );
//        $qb->setFirstResult( 0 );

        $ret = $qb->getQuery()->getResult();

        return $ret;

    }

    public function post(Token $token ) {

      $this->em->merge( $token );
      $this->em->flush();
      return $this;

    }

    public function remove(Token $token ) {
      $this->em->remove($token);
      $this->em->flush();
      return $this;

    }




}