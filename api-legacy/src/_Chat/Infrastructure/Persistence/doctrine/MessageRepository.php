<?php


namespace App\_Chat\Infrastructure\Persistence\doctrine;

use App\_User\DomainModel\User\User;
use Symfony\Bridge\Doctrine\RegistryInterface;
use App\_Chat\DomainModel\Message\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class MessageRepository extends ServiceEntityRepository
{

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Message::class);
    }

    public function findMessages(User $client, User $friend)
    {

        $qb = $this->getEntityManager( )->createQueryBuilder();
        $qb->select('entity');
        $qb->from(sprintf('%s', 'App\\_Chat\\DomainModel\\Message\\Message' ),'entity');
        $qb->where( 'entity.sender = :client AND entity.receiver = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] );
        $qb->orWhere( 'entity.receiver = :client AND entity.sender = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] );
        $qb->orderBy('entity.created', 'DESC');
        $qb->setMaxResults( 20 );
        $qb->groupBy('entity.id');

        return $qb->getQuery()->getResult();


    }

    public function findThreads(User $client, User $friend)
    {

        $qb = $this->getEntityManager( )->createQueryBuilder();
        $qb->select('entity');
        $qb->from(sprintf('%s', 'App\\_Chat\\DomainModel\\Message\\Message' ),'entity');
        $qb->where( 'entity.sender = :client AND entity.receiver = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] );
        $qb->orWhere( 'entity.receiver = :client AND entity.sender = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] );
        $qb->orderBy('entity.created', 'DESC');
        $qb->setMaxResults( 20 );
        $qb->groupBy('entity.id');

        return $qb->getQuery()->getResult();


    }


    public function countMessages(User $client, User $friend) {

        return $this->getEntityManager()->createQueryBuilder()->
        select('count(entity)')->
        from(sprintf('%s', 'App\\_Chat\\DomainModel\\Message\\Message' ),'entity')->
        where( 'entity.sender = :client AND entity.receiver = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] )->
        orWhere( 'entity.receiver = :client AND entity.sender = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] )->
        orderBy('entity.created', 'ASC')->
        getQuery()->
        getSingleScalarResult();

        // and isRead = true
    }

    public function getFirstMessage(User $client, User $friend) {

        return $this->getEntityManager()->createQueryBuilder()->
        select('entity')->
        from(sprintf('%s', 'App\\_Chat\\DomainModel\\Message\\Message' ),'entity')->
        where( 'entity.sender = :client AND entity.receiver = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] )->
        orWhere( 'entity.receiver = :client AND entity.sender = :friend')->setParameters(['client'=>$client, 'friend'=>$friend] )->
        orderBy('entity.created', 'ASC')->
        setMaxResults(1)->
        getQuery()->
        getResult()[0];

    }

    public function getLastMessageUpdate(User $client) {

        return $this->getEntityManager()->createQueryBuilder()->
        select('message.created')->
        from(sprintf('%s', 'App\\_Chat\\DomainModel\\Message\\Message' ),'message')->
        where( 'message.receiver = :client')->setParameter('client',$client )->
        andWhere( 'message.created > :update')->setParameter('update', $client->getUserUpdated())->
        orderBy('message.created', 'DESC')->
        setMaxResults(1)->
        getQuery()->
        getSingleScalarResult();

    }

    public function getLastMessages (User $client) {

        return $this->getEntityManager()->createQueryBuilder()->
        select('entity')->
        from(sprintf('%s', 'App\\_Chat\\DomainModel\\Message\\Message' ),'entity')->
        where( 'entity.receiver = :client')->setParameter('client',$client )->
        andWhere( 'entity.created > :update')->setParameter('update', $client->getUserUpdated())->
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
      from(sprintf('%s', 'App\\_Chat\\DomainModel\\Message\\Message' ),'entity')->
      where( 'entity.isRead = :isRead')->setParameter('isRead',0 )->
      andWhere('entity.lastReminder IS NULL')->
      andWhere( 'entity.created < :date')->setParameter('date', $date)->
      orderBy('entity.created', 'ASC')->
      getQuery()->
      getResult();

    }

    /*
     * Searches for un read message to send to
     */
    public function getUnReadMessagesByUser() {

      $messages = $this->findUnReadMessages();

      $ret = [];

      foreach ($messages as $message) {

        $receiver = $message->getReceiver();

        if (null !== $message->getDeleted()) { // check if user accepted to receive notifications
          continue;
        }

        if(!$receiver) {
            //TODO bug fix in database, shoudldn t happen
            continue;
        }

        if (!$receiver->getEmailNotifications()) { // check if user accepted to receive notifications
          continue;
        }


        $receiverId = $receiver->getId();
        if (isset($ret[$receiverId]) ) {
          $ret[$receiverId]["messages"][] = $message;
        } else {
//          $ret[$receiverId]["receiverId"] = $receiverId;
          $ret[$receiverId]["messages"] = [$message];
          $ret[$receiverId]["email"] = $receiver->getEmail();
          $ret[$receiverId]["firstname"] = $receiver->getFirstName();
        }

      }

      return $ret;

    }



}
