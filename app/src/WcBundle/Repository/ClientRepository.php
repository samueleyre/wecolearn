<?php


namespace WcBundle\Repository;

use WcBundle\Entity\Client;
use WcBundle\Entity\Tag;

use Doctrine\ORM\EntityRepository;

class ClientRepository extends EntityRepository
{
  public function search(Client $client = null, Tag $tag = null, $first = 0, $max = 10, $startLatitude = null, $startLongitude = null)
  {

    if (!$startLatitude || !$startLongitude) {
      $startLatitude = 45.75;
      $startLongitude = 4.85;
    }

    $tags = [];

    if ($client) {
      $tags = $client->getTags();
    }

    if ($tag) {
      $tags[] = $tag;
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

//        $qb->where( 't.type = :number' )->setParameter('number', 0);
    $qb->Where('entity.showProfil = :showProfil')->setParameter('showProfil', true);
    if ($client) {
      $qb->andWhere('entity.id != :clientId')->setParameter('clientId', $client->getId());
    }
    if (count($tags) > 0) {
      $condition = sprintf('t.id=%s', $tags[0]->getId());
      for ($i = 1; $i < count($tags); $i++) {
        $condition .= sprintf(' OR t.id=%s', $tags[$i]->getId());
      }
      $qb->andWhere($condition);
    }

    $qb->orderBy('distance', 'ASC');
    $qb->having('distance < 1000');
    $qb->setFirstResult($first);
    $qb->setMaxResults($max);
//            $qb->groupBy('entity.id'); todo: is groupBy useful ? ( nothing is returned when only one value )

//            return $qb->getQuery()->getSQL();

//            syslog(LOG_ERR,$qb->getQuery()->getSQL());

    $ret = $qb->getQuery()->getResult();

    return $ret;
  }

}


