<?php

namespace App\Services\Chat\Service;

use App\Services\Chat\Entity\Message;
use App\Services\User\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Kreait\Firebase\Messaging;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Messenger\MessageBusInterface;

class MessageService
{
    private $em;
    private $bus;
    private $notificationService;
    private $pushMessage;
    private $serializer;
    private $host;
    private $logger;

    public function __construct(
        EntityManagerInterface $em,
        MessageBusInterface $bus,
        NotificationService $notificationService,
        PushService $pushMessage,
        ContainerInterface $container,
        SerializerInterface $serializer,
        LoggerInterface $logger
    ) {
        $this->logger = $logger;
        $this->em = $em;
        $this->bus = $bus;
        $this->notificationService = $notificationService;
        $this->pushMessage = $pushMessage;
        $this->serializer = $serializer;

        $host = $container->getParameter('host');
        $this->host = str_contains($host, 'localhost') ? "http://$host" : "https://$host";
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
            ["{$this->host}/message"],
            $this->serializer->serialize(
                [ 'message' => $message ],
                'json',
                SerializationContext::create()->setGroups(['message'])
            ),
            ["{$this->host}/message/{$to->getId()}"]
        );
        syslog(LOG_INFO, "TOPIC :---------> {$this->host}/message");
        syslog(LOG_ERR, "TOPIC :---------> {$this->host}/message");
        syslog(LOG_DEBUG, "TOPIC :---------> {$this->host}/message");
        syslog(LOG_INFO, "TARGET :---------> {$this->host}/message/{$to->getId()}");
        syslog(LOG_ERR, "TARGET :---------> {$this->host}/message/{$to->getId()}");
        syslog(LOG_DEBUG, "TARGET :---------> {$this->host}/message/{$to->getId()}");

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

            $messageHasBeenRead = false;
            if ($message->getIsRead() !== $oldMessage->getIsRead()) {
                $messageHasBeenRead = true;
            }

            $oldMessage->setIsRead($message->getIsRead());
            $oldMessage->setUpdated($date = new \DateTime('now', new \DateTimeZone('Europe/Paris')));

            $this->em->persist($oldMessage);
            $this->em->flush();

//            notify user
            if ($messageHasBeenRead) {
                ## PUSH INFO TO USER ON MOBILE
                $this->notificationService->processIsRead( $message->getSender(), $message );

                ## SEND IT BY MERCURE PROTOCOLE FOR WEB
                $update = new Update(
                    ["{$this->host}/message"],
                    $this->serializer->serialize(
                        [ 'is_read' => $message ],
                        'json',
                        SerializationContext::create()->setGroups(['message'])
                    ),
                    ["{$this->host}/message/{$message->getSender()->getId()}"]
                );
                $this->bus->dispatch($update);

            }

            return $oldMessage;
        } else {
            $id = $message->getId();
            syslog(LOG_ERR, "message not found with id : $id");
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
