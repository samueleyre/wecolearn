<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use  FOS\RestBundle\Controller\Annotations\Get;


class RootController extends Controller
{

    /**
     * @Get("/")
     */
    public function indexAction( Request $request )
    {

        return ['weCoLearn aka' => ['alexandre.moreira.pro@gmail.com', 'edouard.touraille@gmail.com', 'samuel.eyre@hotmail.fr' ]];

    }
}
