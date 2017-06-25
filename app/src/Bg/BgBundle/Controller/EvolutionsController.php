<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Model\Evolution as Model;

use  FOS\RestBundle\Controller\Annotations\Get;

use AppBundle\Persist\Memcache\Main as Persist;
use Bg\BgBundle\Metier\Queue\Evolution as Metier;


class EvolutionsController
{
    
    // "options_ancres" [OPTIONS] /ancres
    public function optionEvolutionsAction()
    {
        return [];
        
    } 
    
    /**
	* @Get("/evolutions")
    */
    public function getEvolutionsAction()
    {
        
        return ( new Persist() )->get( Metier::KEY );
		
	}
}