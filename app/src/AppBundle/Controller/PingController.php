<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

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
    * @Route("/api/ping" )
    * @Method({"GET"})
    */
    public function getPingAction()
    {
        return [];
    }

    
}
