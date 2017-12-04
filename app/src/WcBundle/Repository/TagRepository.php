<?php


namespace WcBundle\Repository;

use Doctrine\ORM\EntityRepository;

class TagRepository extends EntityRepository
{
    public function findAllOrderedByIteration($tagLetters)
    {
            $qb = $this->getEntityManager( )->createQueryBuilder();
            $qb->select('entity');
            $qb->from(sprintf('%s', 'WcBundle:Tag' ),'entity');
            $qb->where( 'entity.name LIKE :tagletters')->setParameter('tagletters', '%'.$tagLetters.'%' );
            $qb->andWhere('entity.type = 0');
            $qb->orderBy('entity.name', 'DESC','entity.iteration', 'DESC');
            $qb->setMaxResults( 3 );

            $ret = $qb->getQuery()->getResult();
            return $ret;
    }

}