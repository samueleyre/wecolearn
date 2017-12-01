<?php


namespace WcBundle\Repository;

use WcBundle\Entity\Client;
use WcBundle\Entity\Tag;

use Doctrine\ORM\EntityRepository;

class ClientRepository extends EntityRepository
{
    public function findMatches(Client $client, $startLatitude = null, $startLongitude = null)
    {

            if (!$startLatitude || !$startLongitude) {
                $startLatitude = $client->getLatitude();
                $startLongitude = $client->getLongitude();
            }

            $tags = $client->getTags();

            $qb = $this->getEntityManager( )->createQueryBuilder();
            $qb->select('entity');
            $qb->addSelect(sprintf(' pow(69.1 * (entity.latitude - %s), 2) +
                pow(69.1 * (%s - entity.longitude) * cos(entity.latitude / 57.3), 2) AS distance', $startLatitude, $startLongitude));

            $qb->from(sprintf('%s', 'WcBundle:Client' ),'entity');
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
            $qb->having('distance < 5');
            $qb->orderBy('distance', 'ASC');
            $qb->setMaxResults( 20 );
            $qb->groupBy('entity.id');

            $ret = $qb->getQuery()->getResult();

            return $ret;
    }

    public function search(Tag $tag, Client $client = null, $startLatitude = null, $startLongitude = null)
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
        $qb->setMaxResults( 20 );
        $qb->groupBy('entity.id');

        $ret = $qb->getQuery()->getResult();

        return $ret;
    }



}