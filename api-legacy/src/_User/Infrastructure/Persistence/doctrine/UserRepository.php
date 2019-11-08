<?php

namespace App\_User\Infrastructure\Persistence\doctrine;

use App\_User\DomainModel\User\User;
use App\_User\DomainModel\User\UserRespository;
use App\_Tag\DomainModel\Tag\Tag;
use App\_Application\Domain\Domain;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class UserRepository extends ServiceEntityRepository implements UserRespository
{
    public function __construct(RegistryInterface $registry)
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
  )
  {

    if (!$startLatitude || !$startLongitude) {
      $startLatitude = 45.75;
      $startLongitude = 4.85;
    }

    $tags = [];

    if ($user && $parameters['withUserTags']) {
      $tags = $user->getTags();
    }


    //syslog(LOG_ERR, $user->getLatitude());
    //syslog(LOG_ERR, $startLatitude);


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

    $qb->from('App\\_User\\DomainModel\\User\\User', 'user');

    $qb->innerJoin('user.tags', 't');
//
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
      $qb->andWhere( 't.type = :number' )->setParameter('number', 0);
    }

    if ($domain) {
      $qb->andWhere('d.name = :domainName')->setParameter('domainName', $domain);
    }

    if (count($tags) > 0) {
      $condition = sprintf('t.id=%s', $tags[0]->getId());
      for ($i = 1; $i < count($tags); $i++) {
        $condition .= sprintf(' OR t.id=%s', $tags[$i]->getId());
      }
      $qb->andWhere($condition);
    }

    $qb->orderBy('distance', "ASC");
    $qb->setFirstResult($first);
    $qb->setMaxResults($max);
    $qb->having('distance < 100');

    syslog(LOG_ERR,$qb->getQuery()->getSQL());
//    return $qb->getQuery()->getSQL();
    $ret = $qb->getQuery()->getResult();



    return $ret;
  }

}


