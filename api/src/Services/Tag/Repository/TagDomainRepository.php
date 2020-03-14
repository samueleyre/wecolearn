<?php

namespace App\Services\Tag\Repository;

use App\Services\Tag\Entity\TagDomain;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method TagDomain|null find($id, $lockMode = null, $lockVersion = null)
 * @method TagDomain|null findOneBy(array $criteria, array $orderBy = null)
 * @method TagDomain[]    findAll()
 * @method TagDomain[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TagDomainRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TagDomain::class);
    }

    /**
    * @return TagDomain[] Returns an array of TagDomain objects
    */
    public function findByNameLike($literal)
    {
        $qb = $this->createQueryBuilder('t');
        if ($literal) {
            $qb->andwhere('t.name LIKE :literal')->setParameter('literal', '%'.$literal.'%');
        }
        $qb->orderBy('t.name', 'ASC');
        $qb->setMaxResults(5);

        return $qb->getQuery()->getResult();
    }
}
