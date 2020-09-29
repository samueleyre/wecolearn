<?php

namespace App\Services\Chat\Service;

use App\Services\Chat\Entity\Message;
use App\Services\User\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Kreait\Firebase\Messaging;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Messenger\MessageBusInterface;

class MessageService
{
    private $em;
    private $bus;
    private $notificationService;
    private $pushMessage;
    private $messageSerializer;
    private $host;

    public function __construct(
        EntityManagerInterface $em,
        MessageBusInterface $bus,
        NotificationService $notificationService,
        PushService $pushMessage,
        MessageSerializer $messageSerializer,
        ContainerInterface $container
    ) {
        $this->em = $em;
        $this->bus = $bus;
        $this->notificationService = $notificationService;
        $this->pushMessage = $pushMessage;
        $this->messageSerializer = $messageSerializer;
        $this->host = $container->getParameter('host');
    }


    public function processNewMessage(Message $message) {

        $to = $message->getReceiver();

        $date = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
        $message->setCreated($date);

        ## SAVE MESSAGE IN DB
        $this->postMessage($message);

        ## SEND IT TO SERVICE WORKER BY WEB PUSH
        $this->pushMessage->process($to, $message);

        ## SEND NOTIFICATION TO MOBILE
        $this->notificationService->processMessage( $to, $message );

        ## SEND IT BY MERCURE PROTOCOLE FOR WEB
        $update = new Update(
            'https://wecolearn.com/message',
            $this->messageSerializer->getMessagePayload($message),
            ["https://{$this->host}/message/{$to->getId()}"]
        );
        $this->bus->dispatch($update);

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
