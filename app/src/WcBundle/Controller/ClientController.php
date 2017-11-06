<?php

namespace WcBundle\Controller;

use WcBundle\Entity\Client;
use WcBundle\Entity\Tag;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;
use  FOS\RestBundle\Controller\Annotations\View;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Pagination\Annotation as Pagination;

use JMS\Serializer\Annotation as Serializer;

use JMS\Serializer\SerializationContext;


//TODO : usefull :     * @View(serializerGroups={"test"})



class ClientController extends GPPDController
{

    protected $entityRef = 'WcBundle:Client';

    // "options_client" [OPTIONS] /client
    public function optionClientAction()
    {
        return $this->optionAction();

    }

    /**
	* @Get("client")
    * @View(serializerEnableMaxDepthChecks=true)
     */
    public function getClientAction( )
    {


        $user = $this->get('security.token_storage')->getToken()->getUser();

        return $this->getDoctrine()
            ->getRepository(Client::class)
            ->findBy(["user"=>$user]);


	}

    /**
     * @Get("client/matchs")
     */
    public function getClientMatchsAction( )
    {


        $user = $this->get('security.token_storage')->getToken()->getUser();

        $client = $this->getDoctrine()
            ->getRepository(Client::class)
            ->findOneBy(["user"=>$user]);

        return $this
            ->get('client.service')
            ->matches($client);


    }
    

    
    /**
    * @Patch("/client")
    * @ParamConverter(
            "client",
            class="WcBundle\Entity\Client",
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
	*/
    public function patchClientAction( Client $client, Request $request )
    {

        return $this
            ->get('client.service')
            ->patch($client);
            
    }
    
    /**
    * @Delete("/client/{id}")
    */
    public function deleteClientAction( $id , Request $request )
    {

        $this->deleteAction( $id );

        return $this->getClientAction();
    }


}
