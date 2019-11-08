<?php

namespace App\Services\Tag\Repository;

use App\Services\Tag\Entity\Tag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class TagRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Tag::class);
    }

    public function findAllOrderedByIteration($tagLetters)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('tag');
        $qb->from(sprintf('%s', 'App\\Services\\Tag\\Entity\\Tag'), 'tag');
        $qb->Where('tag.type = 0');
        if ($tagLetters) {
            $qb->andwhere('tag.name LIKE :tagletters')->setParameter('tagletters', '%'.$tagLetters.'%');
        }
        $qb->orderBy('tag.iteration', 'DESC');
        $qb->setMaxResults(3);

        $ret = $qb->getQuery()->getResult();

        return $ret;
    }
}
