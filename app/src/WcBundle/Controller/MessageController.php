<?php

namespace WcBundle\Controller;

use WcBundle\Entity\Message;
use WcBundle\Entity\Tag;
use WcBundle\Entity\Client;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Pagination\Annotation as Pagination;




class MessageController extends GPPDController
{
    
    protected $entityRef = 'WcBundle:Message';

    // "options_message" [OPTIONS] /message
    public function optionMessageAction()
    {
        return $this->optionAction();
        
    } 


    /**
     * @Get("message/{id}")
     */
    public function getMessageMatchsAction($id )
    {

        $user = $this->get('security.token_storage')->getToken()->getUser();


        $client = $this->getDoctrine()
            ->getRepository(Client::class)
            ->findOneBy(["user"=>$user]);

        $friend = $this->getDoctrine()
            ->getRepository(Client::class)
            ->findOneBy(["id"=>$id]);

        return $this->getDoctrine()
            ->getRepository(Message::class)
            ->findMessages($client, $friend );


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


        $client = $this->getDoctrine()
            ->getRepository(Client::class)
            ->findOneBy(["user"=>$user]);

        $friend = $this->getDoctrine()
            ->getRepository(Client::class)
            ->findOneBy(["id"=>$message->getReceiver()->getId()]);

        $message->setReceiver($friend);
        $message->setSender($client);

        $this->get('message.service')->postMessage($message);


        return $this->getDoctrine()
        ->getRepository(Message::class)
        ->findMessages($client, $friend );




    }

    
//    /**
//    * @Patch("/message")
//    * @ParamConverter(
//            "message",
//            class="WcBundle\Entity\Message",
//            converter="fos_rest.request_body",
//            options={"deserializationContext"={"groups"={"input"} } }
//      )
//	*/
//    public function patchMessageAction( Message $message, Request $request )
//    {
//
//        return $this
//            ->get('message.service')
//            ->patch($message);
//
//    }
//
//    /**
//    * @Delete("/message/{id}")
//    */
//    public function deleteMessageAction( $id , Request $request )
//    {
//
//        $this->deleteAction( $id );
//
//        return $this->getMessageAction();
//    }


}
