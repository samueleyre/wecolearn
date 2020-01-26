<?php

namespace App\Services\Chat\Controller;

use App\Services\Chat\Entity\Message;
use App\Services\Chat\Service\BrockerService;
use App\Services\Chat\Service\MessageService;
use App\Services\Chat\Service\PushService;
use App\Services\User\Entity\User;
use App\Services\User\Service\UserService;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\Mercure\PublisherInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class MessageController extends AbstractController
{
    /**
     * @Get("message/{id}")
     */
    public function getMessageMatchsAction($id, TokenStorageInterface $tokenStorage)
    {
        $user = $tokenStorage->getToken()->getUser();

        $friend = $this->getDoctrine()
        ->getRepository(User::class)
        ->findOneBy(['id' => $id]);

        return $this->getDoctrine()
        ->getRepository(Message::class)
        ->findMessages($user, $friend);
    }

    /**
     * @Get("messages")
     * @View(serializerGroups={"message"})
     */
    public function getMessagesAction(TokenStorageInterface $tokenStorage)
    {
        $user = $tokenStorage->getToken()->getUser();

        return [
        'received_messages' => $user->getReceivedMessages(),
        'sent_messages' => $user->getSentMessages(),
        ];
    }

    /**
     * @Get("messages/new")
     */
    public function getNewMessagesAction(TokenStorageInterface $tokenStorage, UserService $userService)
    {
        $user = $tokenStorage->getToken()->getUser();

        $lastMessages = $this->getDoctrine()
              ->getRepository(Message::class)
              ->getLastMessages($user);

        if (count($lastMessages) > 0) {
            $newDate = $lastMessages[count($lastMessages) - 1]->getCreated(); //todo: error here on staging

            //                $newDate = new \DateTime($lastMessages[count($lastMessages)-1]->getCreated());
            $user->setUserUpdated($newDate);

            $userService->patch($user);

            return $lastMessages;
        } else {
            return [];
        }
    }

    /**
     * @Post("/message")
     * @ParamConverter(
    "message",
    class="App\Services\Chat\Entity\Message",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"input"} } }
    )
     *
     */
    public function postMessageAction(
        Request $request,
        Message $message,
        TokenStorageInterface $tokenStorage,
        MessageService $messageService,
        MessageBusInterface $bus,
        PushService $pushMessage,
        SerializerInterface $serializer
    ) {

        $user = $tokenStorage->getToken()->getUser();

        $friend = $this->getDoctrine()
        ->getRepository(User::class)
        ->findOneBy(['id' => $message->getReceiver()->getId()]);

        $message->setReceiver($friend);
        $message->setSender($user);
        $date = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
        $message->setCreated($date);

        ## SAVE MESSAGE IN DB
        $messageService->postMessage($message);

        ## SEND IT TO SERVICE WORKER BY WEB PUSH
        $pushMessage->process($friend, $message, $request );

        $serializedMessage = $serializer->serialize($message, 'json', SerializationContext::create()->setGroups('message'));

        ## SEND IT BY MERCURE PROTOCOLE
        $update = new Update(
            'https://wecolearn.com/message',
            $serializedMessage,
            ["https://wecolearn.com/message/{$friend->getId()}"]
        );
        $bus->dispatch($update);

        return $serializedMessage;
    }

    /**
     * @Patch("/messages")
     * @View(serializerEnableMaxDepthChecks=true, serializerGroups={"message"})
     * @ParamConverter(
    "messages",
    class="array<App\Services\Chat\Entity\Message>",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"input"} } }
    )
     */
    public function patchMessagesAction(array $messages, MessageService $messageService)
    {
        ## ONLY USED TO KNOW IF MESSAGE IS READ
        return $messageService->patchMessages($messages);
    }

    /**
     * @Patch("/message")
     * @ParamConverter(
    "messages",
    class="App\Services\Chat\Entity\Message",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"input"} } }
    )
     */
    public function patchMessageAction(Message $message, MessageService $messageService)
    {
        return $messageService->patchMessage($message);
    }
}
