<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Entity\Programmation;

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



class ProgrammationsController extends GPPDController
{
    
    protected $entityRef = 'BgBundle:Programmation';

    // "options_blogs" [OPTIONS] /blogs
    public function optionProgrammationsAction()
    {
        return $this->optionAction();
        
    } 
    
    /**
	* @Get("/programmations")
    * @Pagination(
        perPage="20",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Programmation"}
     )
    */
    public function getProgrammationsAction()
    {
        
        return $this->getAction();
		
	}

    /**
    * @Patch("/programmations")
    * @Pagination(
        perPage="20",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Programmation"}
      )
    * @ParamConverter(
            "programmation", 
            class="Bg\BgBundle\Entity\Programmation", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
    */
    public function patchProgrammationsAction( Programmation $programmation  )
    {
        return $this->patchAction( $programmation );
            
    }
    

}
