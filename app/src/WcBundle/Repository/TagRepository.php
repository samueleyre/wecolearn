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
            $condition = sprintf('where entity.name like %s', $tagLetters);
            $qb->orderBy('entity.name', 'DESC');
            $qb->setMaxResults( 3 );

            $ret = $qb->getQuery()->getResult();
            return $ret;
    }

}