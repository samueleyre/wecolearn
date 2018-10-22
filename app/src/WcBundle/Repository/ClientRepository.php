<?php


namespace WcBundle\Repository;

use WcBundle\Entity\Client;
use WcBundle\Entity\Tag;
use WcBundle\Entity\Domain;

use Doctrine\ORM\EntityRepository;

class ClientRepository extends EntityRepository
{
  public function search(Client $client = null, Tag $tag = null, $first = 0, $max = 10, $startLatitude = null, $startLongitude = null, $noClientTags = false, $domain = "wecolearn")
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
    $qb->select('client');

    $qb->addSelect(sprintf(' 
            pow(69.1 * (client.latitude - %s), 2) +
            pow(69.1 
                * (%s - client.longitude) 
                * cos(client.latitude / 57.3), 2) AS distance', $startLatitude, $startLongitude));

    $qb->from('WcBundle:Client', 'client');

    $qb->innerJoin('client.tags', 't');
//
    if ($domain) {
      $qb->innerJoin('client.domains', 'd');
    }

//    $qb->where( 't.type = :number' )->setParameter('number', 0);
    $qb->Where('client.showProfil = :showProfil')->setParameter('showProfil', 1);
    if ($client) {
      $qb->andWhere('client.id != :clientId')->setParameter('clientId', $client->getId());
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

    $qb->groupBy('client.id');
    $qb->orderBy('distance', "ASC");
    $qb->having('distance < 1000');
    $qb->setFirstResult($first);
    $qb->setMaxResults($max);

//    syslog(LOG_ERR,$qb->getQuery()->getSQL());

    $ret = $qb->getQuery()->getResult();

    return $ret;
  }

}


