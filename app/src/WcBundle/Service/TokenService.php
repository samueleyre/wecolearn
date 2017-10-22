<?php

namespace WcBundle\Service;

use Doctrine\ORM\EntityManager;

use WcBundle\Entity\Token;

class TokenService {

	private $em;
	
	public function __construct( EntityManager $em ) {
		$this->em = $em;
	}


    public function post( $entity ) {

	    $entity->setToken(random_int(1, 10000000000000000));
        $this->em->persist( $entity );
        $this->em->flush();
        return $this;

    }

    public function get( $filters = []) {

        syslog(LOG_ERR, 'filter'.count($filters));
        $params = [];
        $condition = '';
        $sep = '';
        $qb = $this->em->createQueryBuilder();
        $qb->select('entity');
        $qb->from(sprintf('%s', 'WcBundle:Token' ),'entity');


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


}