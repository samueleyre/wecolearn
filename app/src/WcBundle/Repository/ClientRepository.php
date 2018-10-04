<?php


namespace WcBundle\Repository;

use WcBundle\Entity\Client;
use WcBundle\Entity\Tag;

use Doctrine\ORM\EntityRepository;

class ClientRepository extends EntityRepository
{
  public function search(Client $client = null, Tag $tag = null, $first = 0, $max = 10, $startLatitude = null, $startLongitude = null, $noClientTags = false)
  {

    if (!$startLatitude || !$startLongitude) {
      $startLatitude = 45.75;
      $startLongitude = 4.85;
    }

    $tags = [];

    if ($client && !$noClientTags) {
      $tags = $client->getTags();
    }


    //syslog(LOG_ERR, $client->getLatitude());
    //syslog(LOG_ERR, $startLatitude);


    $qb = $this->getEntityManager()->createQueryBuilder();
    $qb->select('entity');

    $qb->addSelect(sprintf(' 
            pow(69.1 * (entity.latitude - %s), 2) +
            pow(69.1 
                * (%s - entity.longitude) 
                * cos(entity.latitude / 57.3), 2) AS distance', $startLatitude, $startLongitude));

    $qb->from('WcBundle:Client', 'entity');

    $qb->innerJoin('entity.tags', 't');

//    $qb->where( 't.type = :number' )->setParameter('number', 0);
    $qb->Where('entity.showProfil = :showProfil')->setParameter('showProfil', 1);
    if ($client) {
      $qb->andWhere('entity.id != :clientId')->setParameter('clientId', $client->getId());
    }
    if ($tag) {
      $qb->andWhere(sprintf('t.id=%s', $tag->getId()));
    }
    if (count($tags) > 0) {
      $condition = sprintf('t.id=%s', $tags[0]->getId());
      for ($i = 1; $i < count($tags); $i++) {
        $condition .= sprintf(' OR t.id=%s', $tags[$i]->getId());
      }
      $qb->andWhere($condition);
    }

    $qb->groupBy('entity.id');
    $qb->orderBy('distance', "ASC");
    $qb->having('distance < 1000');
    $qb->setFirstResult($first);
    $qb->setMaxResults($max);

//            syslog(LOG_ERR,$qb->getQuery()->getSQL());

    $ret = $qb->getQuery()->getResult();

    return $ret;
  }

}


