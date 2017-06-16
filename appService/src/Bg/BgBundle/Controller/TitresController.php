<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Entity\Titre;

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



class TitresController extends GPPDController
{
    
    protected $entityRef = 'BgBundle:Titre';

    // "options_titres" [OPTIONS] /titres
    public function optionTitresAction()
    {
        return $this->optionAction();
        
    } 
    
    /**
	* @Get("/titres")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Titre"}
     )
    */
    public function getTitresAction()
    {
        
        return $this->getAction();
		
	}
    
    /**
    * @Post("/titres")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Titre"}
        )
    * @ParamConverter(
        "titre",
        class="Bg\BgBundle\Entity\Titre", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postTitresAction( Titre $titre )
    {
        
        return 
            $this
                ->postAction($titre);
        
    }
    
    /**
    * @Patch("/titres")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Titre"}
      )
    * @ParamConverter(
            "titre", 
            class="Bg\BgBundle\Entity\Titre", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
	*/
    public function patchTitresAction( Titre $titre  )
    {
        return $this->patchAction( $titre );
            
    }
    
    /**
    * @Delete("/titres/{id}")
    * @Pagination(
        perPage="5",service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Client"}
      )
    */
    public function deleteTitresAction( $id )
    {
        return $this->deleteAction( $id );
    }
}
