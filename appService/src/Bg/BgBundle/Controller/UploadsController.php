<?php

namespace Bg\BgBundle\Controller;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Get;
use  FOS\RestBundle\Controller\Annotations\Options;

use Symfony\Component\HttpFoundation\Request;

use Bg\BgBundle\Service\ExcelService;
use Bg\BgBundle\Service\ToPhraseService;

class UploadsController {

    /**
    * @Options("/uploads")
    */
    public function optionsUploadsAction()
    {
            return [];
        
    }

    /**
    * @Post("/uploads")
    * @Get("/uploads")
    */
    public function postFilesAction( Request $request ) {

         

        $file = $request->files->get($request->query->get('filename','file'));

        return 
            ToPhraseService::toPhrase(
                ExcelSercie::toArray(
                        $file->getPathName()
                    )
                )
            ;

        
    }   
}