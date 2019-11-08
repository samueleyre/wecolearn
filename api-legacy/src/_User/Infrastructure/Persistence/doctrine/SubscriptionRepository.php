<?php

namespace App\_User\Infrastructure\Persistence\doctrine;

use App\_User\DomainModel\NotificationSubscription\Subscription;
use App\_User\DomainModel\User\User;
use App\_User\DomainModel\User\UserRespository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class SubscriptionRepository extends ServiceEntityRepository implements UserRespository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Subscription::class);
    }

    public function getUnused(User $user, $agent ) {

        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('sub');
        $qb->from('App\\_User\\DomainModel\\NotificationSubscription\\Subscription', 'sub');
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


