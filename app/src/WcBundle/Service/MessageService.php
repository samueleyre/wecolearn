<?php

namespace WcBundle\Service;

use WcBundle\Entity\Message;

use Doctrine\ORM\EntityManager;
use WcBundle\Entity\User;

class MessageService extends GPPDService {

    private $em;
    private $limit;

    public function __construct( EntityManager $em , $limitUntilDestroy) {
        parent::__construct( $em);
        $this->em = $em;
        $this->limit = $limitUntilDestroy;
    }


   public function postMessage(Message $message) {

       $this->regulateMessageStorage( $message);

       return $this->post($message);
   }

   public function regulateMessageStorage(Message $message) {

        $count = $this->em
           ->getRepository(Message::class)
           ->countMessages($message->getSender(), $message->getReceiver() );


       if ($count > $this->limit) {

           $firstMessage = $this->em
               ->getRepository(Message::class)
               ->getFirstMessage($message->getSender(), $message->getReceiver() );

           $this->em->remove(  $firstMessage );
           $this->em->flush();

       }


   }

   public function setReminderDate( $userId ) {

      if (null === $userId || '' == $userId) {
        return;
      }


     $user = $this->em->getRepository(User::class)->find($userId);

     $lastReminder = new \DateTime("now", new \DateTimeZone('Europe/Paris'));

     $receivedMessages = $user->getReceivedMessages();

     foreach ($receivedMessages as $receivedMessage) {

       $receivedMessage->setLastReminder($lastReminder );
       $this->em->merge($receivedMessage);
       $this->em->flush();


     }
















   }





}