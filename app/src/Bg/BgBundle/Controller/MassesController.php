<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Model\Masse;
use Bg\BgBundle\Entity\Masse as Entity;
use Bg\BgBundle\Metier\Masse\PersistMasse;

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


class MassesController extends Controller
{
    
    // "options_ancres" [OPTIONS] /ancres
    public function optionMassesAction()
    {
        return [];
        
    } 
    
    
    /**
    * @Post("/masses")
    * @ParamConverter(
        "masse",
        class="Bg\BgBundle\Model\Masse", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postMassesAction( Masse $masse )
    {
        
        
        $this->get('command_bus')->handle( new PersistMasse( $masse ));
        
        //$ret = \Bg\BgBundle\Metier\Masse\ModelToEntity::convert( $masse );

        return [];
        
    }

    /**
    * @Get("/masses")
    * @Pagination(
        perPage="5",
        service="masse.repository"
      )
    */
    public function getMassesAction( Request $request ) {
        
        return $this->get('masse.repository')->fetchUnused();    
    
    }

    /**
    * @Patch("/masses")
    * @ParamConverter(
        "masse",
        class="Bg\BgBundle\Entity\Masse", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    * @Pagination(
        perPage="5",
        service="masse.repository" 
      )
   */
    public function patchMassesAction( Entity $masse ) {
        
        syslog(LOG_ERR, 'launched : '.$masse->launched );

        $em = $this->get('doctrine.orm.entity_manager');
        $em->merge( $masse );
        $em->flush();
        
        return $this->get('masse.repository')->fetchUnused();    
    }
}