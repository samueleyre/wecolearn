<?php

namespace App\Services\Tag\Repository;

use App\Services\Tag\Entity\Tag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

class TagRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Tag::class);
    }

    public function findAllOrderedByIteration(string $tagLetters, int $type = null)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('tag');
        $qb->from(sprintf('%s', 'App\\Services\\Tag\\Entity\\Tag'), 'tag');
        if( $type !== null) {
            $qb->Where('tag.type = :type')->setParameter('type', $type);
        }
        if ($tagLetters) {
            $qb->andwhere('tag.name LIKE :tagletters')->setParameter('tagletters', '%'.$tagLetters.'%');
        }
        $qb->orderBy('tag.iteration', 'DESC');
        $qb->setMaxResults(3);

        $ret = $qb->getQuery()->getResult();

        return $ret;
    }
}
