<?php

namespace App\_Chat\DomainModel\Message;

use App\_Application\Infrastructure\Persistence\doctrine\CrudService;
use App\_User\DomainModel\User\User;
use Doctrine\ORM\EntityManagerInterface;

class MessageService extends CrudService
{

  private $em;
  private $limit;

  public function __construct(EntityManagerInterface $em, $limitUntilDestroy)
  {
    parent::__construct($em);
    $this->em = $em;
    $this->limit = $limitUntilDestroy;
  }


  public function postMessage(Message $message)
  {

//       $this->regulateMessageStorage( $message);

    return $this->post($message);
  }

  public function patchMessages(array $messages)
  {

    $patchedMessages = [];
    foreach ($messages as $message) {
      $patchedMessages[] = $this->patchMessage($message);
    }

    return $patchedMessages;


  }

  public function patchMessage(Message $message)
  {
    $oldMessage = $this->em
      ->getRepository(Message::class)
      ->findOneBy(["id" => $message->getId()]);

    $oldMessage->setMessage($message->getMessage());
    $oldMessage->setIsRead($message->getIsRead());
    $oldMessage->setUpdated($date = new \DateTime("now", new \DateTimeZone('Europe/Paris')));

    $this->patch($oldMessage);

    return $message;
  }

  public function regulateMessageStorage(Message $message) // useless stuff
  {

    $count = $this->em
      ->getRepository(Message::class)
      ->countMessages($message->getSender(), $message->getReceiver());


    if ($count > $this->limit) {

      $firstMessage = $this->em
        ->getRepository(Message::class)
        ->getFirstMessage($message->getSender(), $message->getReceiver());

      $this->em->remove($firstMessage);
      $this->em->flush();

    }


  }

  public function setReminderDate($userId)
  {

    if (null === $userId || '' == $userId) {
      return;
    }


    $user = $this->em->getRepository(User::class)->find($userId);

    $lastReminder = new \DateTime("now", new \DateTimeZone('Europe/Paris'));

    $receivedMessages = $user->getReceivedMessages();

    foreach ($receivedMessages as $receivedMessage) {

      $receivedMessage->setLastReminder($lastReminder);
      $this->em->merge($receivedMessage);
      $this->em->flush();


    }


  }


}
