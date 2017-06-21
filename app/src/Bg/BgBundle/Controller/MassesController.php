<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Model\Masse;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


use Bg\BgBundle\Metier\Masse\PersistMasse;

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
        
        
        $ret = $this->get('command_bus')->handle( new PersistMasse( $masse ));
        
        $ret = \Bg\BgBundle\Metier\Masse\ModelToEntity::convert( $masse );

        syslog(LOG_ERR, 'class: '.get_class($ret));
        
        return $ret;
        
    }
}
