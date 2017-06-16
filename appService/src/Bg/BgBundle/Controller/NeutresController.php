<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Entity\Neutre;

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



class NeutresController extends GPPDController
{
    
    protected $entityRef = 'BgBundle:Neutre';

    // "options_neutres" [OPTIONS] /neutres
    public function optionNeutresAction()
    {
        return $this->optionAction();
        
    } 
    
    /**
	* @Get("/neutres")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Neutre"}
     )
    */
    public function getNeutresAction()
    {
        
        return $this->getAction();
		
	}
    
    /**
    * @Post("/neutres")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Neutre"}
        )
    * @ParamConverter(
        "neutre",
        class="Bg\BgBundle\Entity\Neutre", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postNeutresAction( Neutre $neutre )
    {
        
        return 
            $this
                ->postAction($neutre);
        
    }
    
    /**
    * @Patch("/neutres")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Neutre"}
      )
    * @ParamConverter(
            "neutre", 
            class="Bg\BgBundle\Entity\Neutre", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
	*/
    public function patchNeutresAction( Neutre $neutre  )
    {
        return $this->patchAction( $neutre );
            
    }
    
    /**
    * @Delete("/neutres/{id}")
    * @Pagination(
        perPage="5",service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Client"}
      )
    */
    public function deleteNeutresAction( $id )
    {
        return $this->deleteAction( $id );
    }
}
