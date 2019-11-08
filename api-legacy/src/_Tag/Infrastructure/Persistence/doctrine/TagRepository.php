<?php


namespace App\_Tag\Infrastructure\Persistence\doctrine;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
Use App\_Tag\DomainModel\Tag\Tag;
use Symfony\Bridge\Doctrine\RegistryInterface;

class TagRepository extends ServiceEntityRepository
{
    public function __construct( RegistryInterface $registry)
    {
        parent::__construct($registry, Tag::class);
    }

    public function findAllOrderedByIteration( $tagLetters )
    {
            $qb = $this->getEntityManager( )->createQueryBuilder();
            $qb->select('entity');
            $qb->from(sprintf('%s', 'App\\_Tag\\DomainModel\\Tag\\Tag' ),'entity');
            $qb->Where('entity.type = 0');
            if ($tagLetters) {
                $qb->andwhere( 'entity.name LIKE :tagletters')->setParameter('tagletters', '%'.$tagLetters.'%' );
            }
            $qb->orderBy('entity.iteration', 'DESC');
            $qb->setMaxResults( 3 );

            $ret = $qb->getQuery()->getResult();
            return $ret;
    }

}
