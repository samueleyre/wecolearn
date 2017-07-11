<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Model\Evolution as Model;

use  FOS\RestBundle\Controller\Annotations\Get;

use Bg\BgBundle\Metier\Queue\Evolution as Metier;
use AppBundle\Persist\Memcache\Main;


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
        
        $persist = new Main();


        $ret = $persist->get( Metier::KEY );

        if( ! $ret ) $ret = [];

        return $ret;
		
	}
}