<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

//use AppBundle\Pagination\Annotation as Pagination;
use AppBundle\Constant\SubdomainConstant;



class PingController extends Controller
{

    // "options_ping" [OPTIONS] /ping
    public function optionsAction()
    {
        return [];
    }


    /**
    * @Get("/api/ping" )
    */
    public function getAction(Request $request)
    {

      $domain = $request->headers->get('host');

      for ($i = 0; $i< count(SubdomainConstant::$list);$i++ ) {
        if (strpos($domain, SubdomainConstant::$list[$i]) !== false) {
          return SubdomainConstant::$list[$i];
        }
      }

      return "lesbricodeurs";

    }



}
