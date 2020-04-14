<?php

namespace App\Services\User\Repository;


use App\Services\User\Entity\PushNotificationSubscription;
use App\Services\User\Entity\Subscription;
use App\Services\User\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class PushNotificationSubscriptionRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, PushNotificationSubscription::class);
    }
}


