<?php

namespace App\Services\User\Repository;

use App\Services\User\Entity\User;
use App\Services\Tag\Entity\Tag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;

class UserRepository extends ServiceEntityRepository
{
    private $logger;

    public function __construct(ManagerRegistry $registry, LoggerInterface $logger)
    {
        parent::__construct($registry, User::class);
    }

    public function search(
        User $user = null,
        Tag $tag = null,
        $first,
        $max,
        $startLatitude,
        $startLongitude,
        $domain,
        $parameters
    ) {
        if (!$startLatitude || !$startLongitude) {
            $startLatitude = 45.75;
            $startLongitude = 4.85;
        }

        $tags = [];

        if ($user && $parameters['withUserTags']) {
            $tags = $user->getTags();
        }

        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('DISTINCT user');

        $qb->addSelect(sprintf(' 
      cast(
          round(
            pow(69.1 * (user.latitude - %s), 2) +
            pow(69.1 
                * (%s - user.longitude) 
                * cos(user.latitude / 57.3), 2)
          , 2 ) AS decimal(6,2) ) AS distance', $startLatitude, $startLongitude));

        $qb->from('App\\Services\\User\\Entity\\User', 'user');

        $qb->innerJoin('user.tags', 't');

        if ($domain) {
            $qb->innerJoin('user.domains', 'd');
        }

        $qb->Where('user.showProfil = :showProfil')->setParameter('showProfil', 1);
        if ($user) {
            $qb->andWhere('user.id != :userId')->setParameter('userId', $user->getId());
        }
        if ($tag) {
            $qb->andWhere(sprintf('t.id=%s', $tag->getId()));
        }
        if ($parameters['onlyLearnTags']) {
            $qb->andWhere('t.type = :number')->setParameter('number', 0);
        }

        if ($domain) {
            $qb->andWhere('d.name = :domainName')->setParameter('domainName', $domain);
        }

        if (count($tags) > 0) {
            $condition = sprintf('t.id=%s', $tags[0]->getId());
            for ($i = 1; $i < count($tags); ++$i) {
                $condition .= sprintf(' OR t.id=%s', $tags[$i]->getId());
            }
            $qb->andWhere($condition);
        }

        $qb->orderBy('distance', 'ASC');
        $qb->setFirstResult($first);
        $qb->setMaxResults($max);
        $qb->having('distance < 100');

        $ret = $qb->getQuery()->getResult();

        return $ret;
    }
}
