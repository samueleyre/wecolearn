<?php


namespace WcBundle\Repository;

use WcBundle\Entity\Client;
use WcBundle\Entity\Message;
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
        getSingleScalarResult();

        // and isRead = true
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
        getResult()[0];

    }

    public function getLastMessageUpdate(Client $client) {

        return $this->getEntityManager()->createQueryBuilder()->
        select('entity.created')->
        from(sprintf('%s', 'WcBundle:Message' ),'entity')->
        where( 'entity.receiver = :client')->setParameter('client',$client )->
        andWhere( 'entity.created > :update')->setParameter('update', $client->getClientUpdated())->
        orderBy('entity.created', 'DESC')->
        setMaxResults(1)->
        getQuery()->
        getSingleScalarResult();

    }

    public function getLastMessages (Client $client) {

        return $this->getEntityManager()->createQueryBuilder()->
        select('entity')->
        from(sprintf('%s', 'WcBundle:Message' ),'entity')->
        where( 'entity.receiver = :client')->setParameter('client',$client )->
        andWhere( 'entity.created > :update')->setParameter('update', $client->getClientUpdated())->
        orderBy('entity.created', 'DESC')->
        setMaxResults(10)->
        getQuery()->
        getResult();

    }

    public function findUnReadMessages ( $lastReminder = null ) {

      if (null === $lastReminder) { // used if second reminder is sent
        $lastReminder = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
      }


      $date = new \DateTime("- 1 Days", new \DateTimeZone('Europe/Paris'));

      return $this->getEntityManager()->createQueryBuilder()->
      select('entity')->
      from(sprintf('%s', 'WcBundle:Message' ),'entity')->
      where( 'entity.isRead = :isRead')->setParameter('isRead',0 )->
      andWhere('entity.lastReminder IS NULL')->
      andWhere( 'entity.created < :date')->setParameter('date', $date)->
      orderBy('entity.created', 'ASC')->
      getQuery()->
      getResult();

    }

    public function getUnReadMessagesByUser() {

      $messages = $this->findUnReadMessages();

      $ret = [];

      foreach ($messages as $message) {

        $sender = $message->getReceiver();
        $senderId = $sender->getId();
        if (isset($ret[$senderId])) {
          $ret[$senderId]["messages"][] = $message;
        } else {
//          $ret[$senderId]["senderId"] = $senderId;
          $ret[$senderId]["messages"] = [$message];
          $ret[$senderId]["email"] = $sender->getUser()->getEmail();
          $ret[$senderId]["firstname"] = $sender->getFirstname();
        }

      }

      return $ret;

    }



}
