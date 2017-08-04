<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class PingController extends Controller
{
    /**
    * @Route("/api/ping" )
    * @Method({"OPTIONS"})
    */
    public function optionsPingAction()
    {
        return [];
    }

    /**
    * @Get("/api/ping" )
    */
    public function getPingAction()
    {
//        return "fuckit";
        return [];
    }

    
}
