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

    public function findAllOrderedByIteration(string $tagLetters, int $type = null, int $max = 5)
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
        $qb->setMaxResults($max);

        $ret = $qb->getQuery()->getResult();

        return $ret;
    }

    public function findByNameLike(string $literal, int $type = null)
    {
        $qb = $this->createQueryBuilder('t');
        $qb->andwhere('t.name LIKE :literal')->setParameter('literal', '%'.$literal.'%');
        if ($type !== null) {
            $qb->andwhere('t.type = :type')->setParameter('type', $type);
        }
        $qb->setMaxResults(5);

        return $qb->getQuery()->getResult();
    }

    public function resetCount()
    {

        $tags = $this->createQueryBuilder('t')
            ->select('t')
            ->where('t.type = 0')
            ->getQuery()
            ->getResult();

        foreach ($tags as $tag) {
            $iterationQuery = $this->createQueryBuilder('t')
                ->select('count( u.id )')
                ->join('t.users', 'u')
                ->where('t.id = :tagId')
                ->setParameter('tagId', $tag->getId());

                $iteration = $iterationQuery->getQuery()->getSingleScalarResult();

            $update = $this->createQueryBuilder('tag')
                ->update()
                ->set('tag.iteration', $iteration)
                ->where('tag.id = :tagId')
                ->setParameter('tagId', $tag->getId());
            $update->getQuery()->getResult();

        }

        syslog(LOG_INFO, 'iteration count updated');
    }
}
