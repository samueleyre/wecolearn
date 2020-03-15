<?php

namespace App\Services\Chat\Repository;

use App\Services\Chat\Entity\Message;
use App\Services\User\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Psr\Log\LoggerInterface;

class MessageRepository extends ServiceEntityRepository
{
    private $logger;

    public function __construct(ManagerRegistry $registry, LoggerInterface $logger)
    {
        parent::__construct($registry, Message::class);
        $this->logger = $logger;
    }

    public function findMessages(User $client, User $friend)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('message');
        $qb->from(sprintf('%s', 'App\\Services\\Chat\\Entity\\Message'), 'message');
        $qb->where('message.sender = :client AND message.receiver = :friend')->setParameters(['client' => $client, 'friend' => $friend]);
        $qb->orWhere('message.receiver = :client AND message.sender = :friend')->setParameters(['client' => $client, 'friend' => $friend]);
        $qb->orderBy('message.created', 'DESC');
        $qb->setMaxResults(20);
        $qb->groupBy('message.id');

        return $qb->getQuery()->getResult();
    }

    public function findThreads(User $client, User $friend)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('message');
        $qb->from(sprintf('%s', 'App\\Services\\Chat\\Entity\\Message'), 'message');
        $qb->where('message.sender = :client AND message.receiver = :friend')->setParameters(['client' => $client, 'friend' => $friend]);
        $qb->orWhere('message.receiver = :client AND message.sender = :friend')->setParameters(['client' => $client, 'friend' => $friend]);
        $qb->orderBy('message.created', 'DESC');
        $qb->setMaxResults(20);
        $qb->groupBy('message.id');

        return $qb->getQuery()->getResult();
    }

    public function countMessages(User $client, User $friend)
    {
        return $this->getEntityManager()->createQueryBuilder()->
        select('count(message)')->
        from(sprintf('%s', 'App\\Services\\Chat\\Entity\\Message'), 'message')->
        where('message.sender = :client AND message.receiver = :friend')->setParameters(['client' => $client, 'friend' => $friend])->
        orWhere('message.receiver = :client AND message.sender = :friend')->setParameters(['client' => $client, 'friend' => $friend])->
        orderBy('message.created', 'ASC')->
        getQuery()->
        getSingleScalarResult();

        // and isRead = true
    }

    public function getFirstMessage(User $client, User $friend)
    {
        return $this->getEntityManager()->createQueryBuilder()->
        select('message')->
        from(sprintf('%s', 'App\\Services\\Chat\\Entity\\Message'), 'message')->
        where('message.sender = :client AND message.receiver = :friend')->setParameters(['client' => $client, 'friend' => $friend])->
        orWhere('message.receiver = :client AND message.sender = :friend')->setParameters(['client' => $client, 'friend' => $friend])->
        orderBy('message.created', 'ASC')->
        setMaxResults(1)->
        getQuery()->
        getResult()[0];
    }

    public function getLastMessageUpdate(User $client)
    {
        return $this->getEntityManager()->createQueryBuilder()->
        select('message.created')->
        from(sprintf('%s', 'App\\Services\\Chat\\Entity\\Message'), 'message')->
        where('message.receiver = :client')->setParameter('client', $client)->
        andWhere('message.created > :update')->setParameter('update', $client->getUserUpdated())->
        orderBy('message.created', 'DESC')->
        setMaxResults(1)->
        getQuery()->
        getSingleScalarResult();
    }

    public function getLastMessages(User $client)
    {
        return $this->getEntityManager()->createQueryBuilder()->
        select('message')->
        from(sprintf('%s', 'App\\Services\\Chat\\Entity\\Message'), 'message')->
        where('message.receiver = :client')->setParameter('client', $client)->
        andWhere('message.created > :update')->setParameter('update', $client->getUserUpdated())->
        orderBy('message.created', 'DESC')->
        setMaxResults(10)->
        getQuery()->
        getResult();
    }

    public function findUnReadMessages($lastReminder = null)
    {
//        if (null === $lastReminder) { // used if second reminder is sent
//            $lastReminder = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
//        }
//
//        $date = new \DateTime('- 1 Days', new \DateTimeZone('Europe/Paris'));

        return $this->getEntityManager()->createQueryBuilder()->
        select('message')->
        from(sprintf('%s', 'App\\Services\\Chat\\Entity\\Message'), 'message')->
        where('message.isRead = :isRead')->setParameter('isRead', 0)->
        andWhere('message.lastReminder IS NULL')->
//        andWhere('message.created < :date')->setParameter('date', $date)->
        orderBy('message.created', 'ASC')->
        getQuery()->
        getResult();
    }

    /*
     * Searches for unread message to send to
     */
    public function getUnReadMessagesByUser()
    {
        $messages = $this->findUnReadMessages();

        $ret = [];

        foreach ($messages as $message) {
            $receiver = $message->getReceiver();

            if (null !== $message->getDeleted()) {
                continue;
            }

            // check if user accepted to receive notifications
            if (!$receiver->getNewMessageNotification()) {
                continue;
            }

            $receiverId = $receiver->getId();
            if (isset($ret[$receiverId])) {
                $ret[$receiverId]['messages'][] = $message;
            } else {
                $ret[$receiverId]['messages'] = [$message];
                $ret[$receiverId]['email'] = $receiver->getEmail();
                $ret[$receiverId]['firstname'] = $receiver->getFirstName();
            }
        }

        return $ret;
    }
}
