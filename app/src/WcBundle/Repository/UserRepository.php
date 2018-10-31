<?php


namespace WcBundle\Repository;

use WcBundle\Entity\User;
use WcBundle\Entity\Tag;
use WcBundle\Entity\Domain;

use Doctrine\ORM\EntityRepository;

class UserRepository extends EntityRepository
{
  public function search(User $user = null, Tag $tag = null, $first = 0, $max = 10, $startLatitude = null, $startLongitude = null, $noUserTags = false, $domain = "wecolearn")
  {

    if (!$startLatitude || !$startLongitude) {
      $startLatitude = 45.75;
      $startLongitude = 4.85;
    }

    $tags = [];

    if ($user && !$noUserTags) {
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

    $qb->from('WcBundle:User', 'user');

    $qb->innerJoin('user.tags', 't');
//
    if ($domain) {
      $qb->innerJoin('user.domains', 'd');
    }

//    $qb->where( 't.type = :number' )->setParameter('number', 0);
    $qb->Where('user.showProfil = :showProfil')->setParameter('showProfil', 1);
    if ($user) {
      $qb->andWhere('user.id != :userId')->setParameter('userId', $user->getId());
    }
    if ($tag) {
      $qb->andWhere(sprintf('t.id=%s', $tag->getId()));
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

//    syslog(LOG_ERR,$qb->getQuery()->getSQL());

    $ret = $qb->getQuery()->getResult();

    return $ret;
  }

}


