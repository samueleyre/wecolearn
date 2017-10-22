<?php

namespace WcBundle\Controller;

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
    */
    public function getClientAction( )
    {


        $user = $this->get('security.token_storage')->getToken()->getUser();

        return $this->getDoctrine()
            ->getRepository(Client::class)
            ->findBy(["user"=>$user]);


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

        $this->patchAction( $client );

        return $this->getClientAction();
            
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
