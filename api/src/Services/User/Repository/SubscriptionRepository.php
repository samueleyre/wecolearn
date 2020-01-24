<?php

namespace App\Services\User\Repository;


use App\Services\User\Entity\Subscription;
use App\Services\User\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class SubscriptionRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Subscription::class);
    }

    public function getUnused(User $user, $agent ) {

        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('sub');
        $qb->from('App\\Services\\User\\Entity\\Subscription', 'sub');
        $qb->innerJoin('sub.user', 'u');
        $qb->where('u.id = :userId');
        $qb->andWhere('sub.agent = :agent');
        $qb->orderBy('sub.id', 'ASC');
        $qb->setParameters([':agent' => $agent, ':userId' => $user->getId()]);
        $ret = $qb->getQuery()->getResult();

        array_pop( $ret );

        return $ret;
    }
}


