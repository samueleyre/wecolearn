<?php

namespace WcBundle\Service;

use WcBundle\Entity\Message;
use AppBundle\Entity\User;

use Doctrine\ORM\EntityManager;

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





}