<?php


namespace WcBundle\Repository;

use WcBundle\Entity\Client;
use Doctrine\ORM\EntityRepository;

class MessageRepository extends EntityRepository
{

    public function findMessages(Client $client, Client $friend)
    {

        $qb = $this->getEntityManager( )->createQueryBuilder();
        $qb->select('entity');
        $qb->from(sprintf('%s', 'WcBundle:Message' ),'entity');
        $qb->where( 'entity.sender = :client AND entity.receiver = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] );
        $qb->orWhere( 'entity.receiver = :client AND entity.sender = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] );
        $qb->orderBy('entity.created', 'DESC');
        $qb->setMaxResults( 20 );
        $qb->groupBy('entity.id');

        return $qb->getQuery()->getResult();


    }

    public function countMessages(Client $client, Client $friend) {

        return $this->getEntityManager()->createQueryBuilder()->
        select('count(entity)')->
        from(sprintf('%s', 'WcBundle:Message' ),'entity')->
        where( 'entity.sender = :client AND entity.receiver = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] )->
        orWhere( 'entity.receiver = :client AND entity.sender = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] )->
        orderBy('entity.created', 'ASC')->
        getQuery()->
        getResult();

    }

    public function getFirstMessage(Client $client, Client $friend) {

        return $this->getEntityManager()->createQueryBuilder()->
        select('entity')->
        from(sprintf('%s', 'WcBundle:Message' ),'entity')->
        where( 'entity.sender = :client AND entity.receiver = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] )->
        orWhere( 'entity.receiver = :client AND entity.sender = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] )->
        orderBy('entity.created', 'ASC')->
        setMaxResults(1)->
        getQuery()->
        getResult();
    }


}