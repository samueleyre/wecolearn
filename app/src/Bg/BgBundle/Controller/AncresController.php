<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Entity\Ancre;

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



class AncresController extends GPPDController
{
    
    protected $entityRef = 'BgBundle:Ancre';

    // "options_ancres" [OPTIONS] /ancres
    public function optionAncresAction()
    {
        return $this->optionAction();
        
    } 
    
    /**
	* @Get("/ancres")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Ancre"}
     )
    */
    public function getAncresAction()
    {
        
        return $this->getAction();
		
	}
    
    /**
    * @Post("/ancres")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Ancre"}
        )
    * @ParamConverter(
        "ancre",
        class="Bg\BgBundle\Entity\Ancre", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postAncresAction( Ancre $ancre )
    {
        
        return 
            $this
                ->postAction($ancre);
        
    }
    
    /**
    * @Patch("/ancres")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Ancre"}
      )
    * @ParamConverter(
            "ancre", 
            class="Bg\BgBundle\Entity\Ancre", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
	*/
    public function patchAncresAction( Ancre $ancre  )
    {
        return $this->patchAction( $ancre );
            
    }
    
    /**
    * @Delete("/ancres/{id}")
    * @Pagination(
        perPage="5",service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Client"}
      )
    */
    public function deleteAncresAction( $id )
    {
        return $this->deleteAction( $id );
    }
}
