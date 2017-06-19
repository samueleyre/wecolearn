<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Entity\Clef;

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



class ClefsController extends GPPDController
{
    
    protected $entityRef = 'BgBundle:Clef';

    // "options_clefs" [OPTIONS] /clefs
    public function optionClefsAction()
    {
        return $this->optionAction();
        
    } 
    
    /**
	* @Get("/clefs")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Clef"}
     )
    */
    public function getClefsAction()
    {
        
        return $this->getAction();
		
	}
    
    /**
    * @Post("/clefs")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Clef"}
        )
    * @ParamConverter(
        "clef",
        class="Bg\BgBundle\Entity\Clef", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postClefsAction( Clef $clef )
    {
        
        return 
            $this
                ->postAction($clef);
        
    }
    
    /**
    * @Patch("/clefs")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Clef"}
      )
    * @ParamConverter(
            "clef", 
            class="Bg\BgBundle\Entity\Clef", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
	*/
    public function patchClefsAction( Clef $clef  )
    {
        return $this->patchAction( $clef );
            
    }
    
    /**
    * @Delete("/clefs/{id}")
    * @Pagination(
        perPage="5",service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Client"}
      )
    */
    public function deleteClefsAction( $id )
    {
        return $this->deleteAction( $id );
    }
}
