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
    public function indexAction(Request $request)
    {
        return [
            'This is the wecolearn api, contact us here : contact+api@wecolearn.com',
        ];
    }
}
