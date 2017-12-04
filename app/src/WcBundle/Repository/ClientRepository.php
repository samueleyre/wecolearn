<?php


namespace WcBundle\Repository;

use WcBundle\Entity\Client;
use WcBundle\Entity\Tag;

use Doctrine\ORM\EntityRepository;

class ClientRepository extends EntityRepository
{
    public function findMatches( Client $client, $first = 0, $max = 10, $startLatitude = null, $startLongitude = null)
    {

            if (! $startLatitude || ! $startLongitude ) {
                $startLatitude = (null === $client->getLatitude())?$client->getLatitude():45.75;
                $startLongitude = (null === $client->getLongitude())?$client->getLongitude():4.85;
            }

            $tags = $client->getTags();

            syslog(LOG_ERR, $startLongitude);

            $qb = $this->getEntityManager( )->createQueryBuilder();
            $qb->select('entity');

            $qb->addSelect(sprintf(' 
                pow(69.1 * (entity.latitude - %s), 2) +
                pow(69.1 
                    * (%s - entity.longitude) 
                    * cos(entity.latitude / 57.3), 2) AS distance', $startLatitude, $startLongitude));
            
            $qb->from( sprintf('%s', 'WcBundle:Client' ),'entity');
            $qb->innerJoin('entity.tags', 't');
            $qb->where( 'entity.id != :clientId')->setParameter('clientId', $client->getId() );
            $qb->andWhere( 't.type = :number'  )->setParameter('number', 0);
            if(count($tags) > 0 ) {
                $condition = sprintf('t.id=%s',  $tags[0]->getId());
                for ($i = 1; $i < count($tags); $i++) {
                    $condition .= sprintf(' OR t.id=%s',  $tags[$i]->getId());
                }
                $qb->andWhere( $condition );
            }
            $qb->having('distance < 1000');
            $qb->orderBy('distance', 'ASC');
            $qb->setFirstResult( $first );
            $qb->setMaxResults( $max );
            $qb->groupBy('entity.id');

            syslog(LOG_ERR,$qb->getQuery()->getSQL());

            $ret = $qb->getQuery()->getResult();

            return $ret;
    }

    public function search(Tag $tag, $first = 0, $max = 10, Client $client = null, $startLatitude = null, $startLongitude = null)
    {

        if (!$startLatitude || !$startLongitude) {
            $startLatitude = $client->getLatitude();
            $startLongitude = $client->getLongitude();
        }


        $qb = $this->getEntityManager( )->createQueryBuilder();
        $qb->select('entity');
        $qb->addSelect(sprintf(' pow(69.1 * (entity.latitude - %s), 2) +
                pow(69.1 * (%s - entity.longitude) * cos(entity.latitude / 57.3), 2) AS distance', $startLatitude, $startLongitude));
        $qb->from(sprintf('%s', 'WcBundle:Client' ),'entity');
        $qb->innerJoin('entity.tags', 't');
        $qb->where( 't.type = :number'  )->setParameter('number', 0);
        $qb->andWhere('t.name = :name')->setParameter('name', $tag->getName());
        if ($client) {
            $qb->andWhere( 'entity.id != :clientId')->setParameter('clientId', $client->getId() );
        }
        $qb->having('distance < 20');
        $qb->orderBy('distance', 'ASC');
        $qb->setFirstResult( $first );
        $qb->setMaxResults( $max );
        $qb->groupBy('entity.id');

        $ret = $qb->getQuery()->getResult();

        return $ret;
    }



}
