<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Entity\Hebergeur;

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



class HebergeursController extends GPPDController
{
    
    protected $entityRef = 'BgBundle:Hebergeur';

    // "options_hebergeurs" [OPTIONS] /hebergeurs
    public function optionHebergeursAction()
    {
        return $this->optionAction();
        
    } 
    
    /**
	* @Get("/hebergeurs")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Hebergeur"}
     )
    */
    public function getHebergeursAction()
    {
        
        return $this->getAction();
		
	}
    
    /**
    * @Post("/hebergeurs")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Hebergeur"}
        )
    * @ParamConverter(
        "hebergeur",
        class="Bg\BgBundle\Entity\Hebergeur", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postHebergeursAction( Hebergeur $hebergeur )
    {
        
        return 
            $this
                ->postAction($hebergeur);
        
    }
    
    /**
    * @Patch("/hebergeurs")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Hebergeur"}
      )
    * @ParamConverter(
            "hebergeur", 
            class="Bg\BgBundle\Entity\Hebergeur", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
	*/
    public function patchHebergeursAction( Hebergeur $hebergeur  )
    {
        return $this->patchAction( $hebergeur );
            
    }
    
    /**
    * @Delete("/hebergeurs/{id}")
    * @Pagination(
        perPage="5",service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Client"}
      )
    */
    public function deleteHebergeursAction( $id )
    {
        return $this->deleteAction( $id );
    }
}
