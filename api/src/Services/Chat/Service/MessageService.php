<?php

namespace App\Services\Chat\Service;

use App\Services\Chat\Entity\Message;
use App\Services\User\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class MessageService
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function postMessage(Message $message)
    {
        $this->em->persist($message);
        $this->em->flush();

        return $this;
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
            ->findOneBy(['id' => $message->getId()]);

        if ($oldMessage) {
            $oldMessage->setMessage($message->getMessage());
            $oldMessage->setIsRead($message->getIsRead());
            $oldMessage->setUpdated($date = new \DateTime('now', new \DateTimeZone('Europe/Paris')));

            $this->em->merge($oldMessage);
            $this->em->flush();
            return $oldMessage;
        }

        return $message;
    }

    public function setReminderDate($userId)
    {
        if (null === $userId || '' == $userId) {
            return;
        }

        $user = $this->em->getRepository(User::class)->find($userId);

        $lastReminder = new \DateTime('now', new \DateTimeZone('Europe/Paris'));

        $receivedMessages = $user->getReceivedMessages();

        foreach ($receivedMessages as $receivedMessage) {
            $receivedMessage->setLastReminder($lastReminder);
            $this->em->merge($receivedMessage);
            $this->em->flush();
        }
    }
}
