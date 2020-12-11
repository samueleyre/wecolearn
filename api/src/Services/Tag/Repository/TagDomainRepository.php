<?php

namespace App\Services\Tag\Repository;

use App\Services\Tag\Entity\TagDomain;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Collection;
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
     * @param $literal
     * @return Collection|TagDomain[] Returns an array of TagDomain objects
     */
    public function findByNameLike($literal)
    {
        $qb = $this->createQueryBuilder('t');
        if ($literal) {
            $qb->andwhere('t.name LIKE :literal')->setParameter('literal', '%'.$literal.'%');
        }
        $qb->setMaxResults(50);
        return $qb->getQuery()->getResult();
    }

    /**
     * @param $limit
     * @return Collection|TagDomain[] Returns an array of TagDomain objects
     */
    public function getPopular($limit)
    {
        $qb = $this->createQueryBuilder('td');
        $qb->join('td.tags ', 't');
        $qb->andwhere('t.type = 0');
        $qb->orderBy('t.iteration', 'DESC');
        $qb->setMaxResults($limit);
        return $qb->getQuery()->getResult();
    }



}
