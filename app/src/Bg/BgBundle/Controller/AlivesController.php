<?php

namespace Bg\BgBundle\Controller;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;




class AlivesController extends Controller
{
    
    public function optionDownsAction()
    {
        return [];
        
    } 
    
    /**
	* @Get("/downs")
    */
    public function getDownsAction()
    {
        
        return $this->get('blog.repository')->fetchAlive( false );
		
	}
}
