<?php

namespace App\Services\Chat\Controller;

use App\Services\Chat\Entity\Message;
use App\Services\Chat\Service\MessageService;
use App\Services\User\Entity\User;
use App\Services\User\Service\UserService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\HttpFoundation\Response;
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
     * @param TokenStorageInterface $tokenStorage
     * @return array
     */
    public function getMessagesAction(TokenStorageInterface $tokenStorage): array
    {
        $user = $tokenStorage->getToken()->getUser();

        return [
        'received_messages' => $user->getReceivedMessages()->filter(function(Message $message) use ($user) {
            return $message->getSender()->getId() !== $user->getId();
        }),
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
    options={"deserializationContext"={"groups"={"input"} } })
     * @param Message $message
     * @param TokenStorageInterface $tokenStorage
     * @param MessageService $messageService
     * @return Response
     */
    public function postMessageAction(
        Message $message,
        TokenStorageInterface $tokenStorage,
        MessageService $messageService
    ): Response
    {

        $user = $tokenStorage->getToken()->getUser();

        $friend = $this->getDoctrine()
        ->getRepository(User::class)
        ->findOneBy(['id' => $message->getReceiver()->getId()]);

        $message->setReceiver($friend);
        $message->setSender($user);

        $messageService->processNewMessage($message);

        return new Response();
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
