<?php

namespace WcBundle\Controller;

use WcBundle\Entity\Message;
use WcBundle\Entity\Tag;
use WcBundle\Entity\User;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


class MessageController extends Controller
{


    /**
     * @Get("message/{id}")
     */
    public function getMessageMatchsAction($id )
    {

        $user = $this->get('security.token_storage')->getToken()->getUser();


        $friend = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy(["id"=>$id]);

        return $this->getDoctrine()
            ->getRepository(Message::class)
            ->findMessages($user, $friend );


    }

    /**
     * @Get("checknewmessage")
     */
    public function getNewMessagesAction()
    {

        $user = $this->get('security.token_storage')->getToken()->getUser();

//        syslog(LOG_ERR,'check new message, getting user '.$user);

        try {

            if ($lastMessages = $this->getDoctrine()
                ->getRepository(Message::class)
                ->getLastMessages($user) !== []) {


                $newDate = $lastMessages[count($lastMessages)-1]->getCreated();


//                $newDate = new \DateTime($lastMessages[count($lastMessages)-1]->getCreated());
                $user->setUserUpdated($newDate);

                $this->get("user.service")->patch($user);

                return $lastMessages;

            } else {
                return null;
            }

        } catch (\Exception $e) {
            return null;
        }





    }



    /**
     * @Post("/message")
     * @ParamConverter(
    "message",
    class="WcBundle\Entity\Message",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"input"} } }
    )
     */
    public function postMessageAction( Message $message, Request $request )
    {

        $user = $this->get('security.token_storage')->getToken()->getUser();


        $friend = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy(["id"=>$message->getReceiver()->getId()]);

        $message->setReceiver($friend);
        $message->setSender($user);
        $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
        $message->setCreated($date);


        $this->get('message.service')->postMessage($message);


        return $message;





    }


    /**
    * @Patch("/messages")
    * @ParamConverter(
            "messages",
            class="array<WcBundle\Entity\Message>",
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
	*/
    public function patchMessagesAction( array $messages)
    {

        foreach ($messages as $message) {

            $oldMessage = $this->getDoctrine()
                ->getRepository(Message::class)
                ->findOneBy(["id"=>$message->getId()]);

            $oldMessage->setMessage($message->getMessage());
            $oldMessage->setIsRead($message->getIsRead());
            $oldMessage->setUpdated($date = new \DateTime("now", new \DateTimeZone('Europe/Paris')));

            $this
                ->get('message.service')
                ->patch($oldMessage);

        }

        return "ok";

    }


}
