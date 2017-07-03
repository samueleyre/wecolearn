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
        setters={"setEntityRef":"BgBundle:Clef"},
        filters={"idClient"}
     )
    */
    public function getClefsAction(Request $request )
    {
        $idClient = $request->query->get('idClient');

        $filter = [];


        if(isset($idClient)) {
            $filter['idClient'] = $idClient;
        }

        return $this->getAction($filter);
		
	}
    
    /**
    * @Post("/clefs")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Clef"},
        filters={"idClient"}
        )
    * @ParamConverter(
        "clef",
        class="Bg\BgBundle\Entity\Clef", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postClefsAction( Clef $clef, Request $request )
    {
        
        $idClient = $request->query->get('idClient');

        $filter = [];


        if(isset($idClient)) {
            $filter['idClient'] = $idClient;
        }
        
        return 
            $this
                ->postAction($clef, $filter );
        
    }
    
    /**
    * @Patch("/clefs")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Clef"},
        filters={"idClient"}
      )
    * @ParamConverter(
            "clef", 
            class="Bg\BgBundle\Entity\Clef", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
	*/
    public function patchClefsAction( Clef $clef , Request $request )
    {
        $idClient = $request->query->get('idClient');

        $filter = [];


        if(isset($idClient)) {
            $filter['idClient'] = $idClient;
        }

        return $this->patchAction( $clef , $filter );
            
    }
    
    /**
    * @Delete("/clefs/{id}")
    * @Pagination(
        perPage="5",service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Clef"},
        filters={"idClient"}
      )
    */
    public function deleteClefsAction( $id, Request $request )
    {
        $idClient = $request->query->get('idClient');

        $filter = [];


        if(isset($idClient)) {
            $filter['idClient'] = $idClient;
        }

        return $this->deleteAction( $id, $filter );
    }
}
