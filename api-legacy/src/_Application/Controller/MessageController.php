<?php

namespace App\_Application\Controller;

use App\_Application\Infrastructure\Notification\PushMessage\Sender;
use App\_Chat\DomainModel\Message\Message;
use App\_Tag\DomainModel\Tag\Tag;
use App\_User\DomainModel\User\User;

use App\_Chat\DomainModel\Message\MessageService;
use App\WcBundle\Service\UserService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use App\_Application\Infrastructure\Notification\BrockerMessage\Sender as Broker;

class MessageController extends Controller
{


  /**
   * @Get("message/{id}")
   */
  public function getMessageMatchsAction($id, TokenStorageInterface $tokenStorage)
  {

    $user = $tokenStorage->getToken()->getUser();


    $friend = $this->getDoctrine()
      ->getRepository(User::class)
      ->findOneBy(["id" => $id]);

    return $this->getDoctrine()
      ->getRepository(Message::class)
      ->findMessages($user, $friend);


  }



  /**
   * @Get("messages")
   * @View(serializerGroups={"message"})
   */
  public function getMessagesAction(TokenStorageInterface $tokenStorage )
  {

    $user = $tokenStorage->getToken()->getUser();


    return [
      "received_messages" => $user->getReceivedMessages(),
      "sent_messages" => $user->getSentMessages()
    ];


  }





  /**
   * @Get("messages/new")
   */
  public function getNewMessagesAction(TokenStorageInterface $tokenStorage, UserService $userService )
  {


          $user = $tokenStorage->getToken()->getUser();

//        syslog(LOG_ERR,'check new message, getting user '.$user);


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
  class="App\_Chat\DomainModel\Message\Message",
  converter="fos_rest.request_body",
  options={"deserializationContext"={"groups"={"input"} } }
  )
   */
  public function postMessageAction(Message $message, Request $request, TokenStorageInterface $tokenStorage , MessageService $messageService, Sender $pushMessage  , Broker $brokerMessage )
  {

    $user = $tokenStorage->getToken()->getUser();

    $friend = $this->getDoctrine()
      ->getRepository(User::class)
      ->findOneBy(["id" => $message->getReceiver()->getId()]);


    $message->setReceiver($friend);
    $message->setSender($user);
    $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
    $message->setCreated($date);


    $messageService->postMessage($message);

    $sended = $pushMessage->process($friend, $message, $request );
    //if( !$sended ) {
        $brokerMessage->process( $friend, $message );
    //}

    return $message;

  }


  /**
   * @Patch("/messages")
   * @ParamConverter(
  "messages",
  class="array<App\_Chat\DomainModel\Message\Message>",
  converter="fos_rest.request_body",
  options={"deserializationContext"={"groups"={"input"} } }
  )
   */
  public function patchMessagesAction(array $messages, MessageService $messageService)
  {

    return $messageService->patchMessages($messages);

  }

  /**
   * @Patch("/message")
   * @ParamConverter(
  "messages",
  class="App\_Chat\DomainModel\Message\Message",
  converter="fos_rest.request_body",
  options={"deserializationContext"={"groups"={"input"} } }
  )
   */
  public function patchMessageAction(Message $message, MessageService $messageService)
  {

    return $messageService->patchMessage($message);

  }


}
