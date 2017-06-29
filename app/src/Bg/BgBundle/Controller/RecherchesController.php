<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Entity\Recherche;

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



class RecherchesController extends GPPDController
{
    
    protected $entityRef = 'BgBundle:Recherche';

    // "options_recherches" [OPTIONS] /recherches
    public function optionRecherchesAction()
    {
        return $this->optionAction();
        
    } 
    
    /**
	* @Get("/recherches")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Recherche"}
     )
    */
    public function getRecherchesAction()
    {
        
        return $this->getAction();
		
	}

    /**
    * @Get("/recherches-resultats")
    */
    public function getRecherchesResultatsAction()
    {
        
        return $this->get('recherche.repository')->get();
        
    }
    
    /**
    * @Post("/recherches")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Recherche"}
        )
    * @ParamConverter(
        "recherche",
        class="Bg\BgBundle\Entity\Recherche", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postRecherchesAction( Recherche $recherche )
    {
        
        return 
            $this
                ->postAction($recherche);
        
    }
    
    /**
    * @Patch("/recherches")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Recherche"}
      )
    * @ParamConverter(
            "recherche", 
            class="Bg\BgBundle\Entity\Recherche", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
	*/
    public function patchRecherchesAction( Recherche $recherche  )
    {
        return $this->patchAction( $recherche );
            
    }
    
    /**
    * @Delete("/recherches/{id}")
    * @Pagination(
        perPage="5",service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Client"}
      )
    */
    public function deleteRecherchesAction( $id )
    {
        return $this->deleteAction( $id );
    }
}
