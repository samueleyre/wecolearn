<?php

namespace App\Services\Core\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Get;

class RootController extends AbstractController
{
    /**
     * @Get("/")
     */
    public function indexAction()
    {
        echo 'Api à usage pédagogique par hello@samueleyre.com';
    }
}
