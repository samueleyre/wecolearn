<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Entity\Client;

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



class ClientsController extends GPPDController
{
    
    protected $entityRef = 'BgBundle:Client';

    // "options_blogs" [OPTIONS] /blogs
    public function optionClientsAction()
    {
        return $this->optionAction();
        
    } 
    
    /**
	* @Get("/clients")
    * @Pagination(
        perPage="5",
        service="gppd.service",
        setters={"setEntityRef":"BgBundle:Client"}
     )
    */
    public function getClientsAction()
    {
        
        return $this->getAction();
		
	}

    /**
    * @Get("/clients/avec-clefs")
    */
    public function getClientsWithClefAction()
    {
        
        return $this->get('client.repository')->fetchClientsAvecClefs();
        
    }
    
    /**
    * @Post("/clients")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Client"}
        )
    * @ParamConverter(
        "client",
        class="Bg\BgBundle\Entity\Client", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postClientsAction( Client $client )
    {
        
        return 
            $this
                ->postAction($client);
        
    }
    
    /**
    * @Patch("/clients")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Client"}
      )
    * @ParamConverter(
            "client", 
            class="Bg\BgBundle\Entity\Client", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
	*/
    public function patchClientsAction( Client $client )
    {
        return $this->patchAction( $client );
            
    }
    
    /**
    * @Delete("/clients/{id}")
    * @Pagination(
        perPage="5",service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Client"}
      )
    */
    public function deleteClientsAction( $id )
    {
        return $this->deleteAction( $id );
    }
}
