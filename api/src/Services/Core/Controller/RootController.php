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
            'weCoLearn aka' => [
                'alexandre.moreira.pro@gmail.com',
                'edouard.touraille@gmail.com',
                'hello@samueleyre.com',
            ],
        ];
    }
}
