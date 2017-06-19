<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Metier\Sentence;

use Bg\BgBundle\Entity\Neutre;


use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Options;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Pagination\Annotation as Pagination;



class NeutresGeneratorController extends Controller
{
    
    
    
    // "options_ancres" [OPTIONS] /ancres
    /**
    * @Options("/neutres/generator")
    */
    public function optionNeutresGeneratorAction()
    {
        return [];
        
    } 

    /**
	* @Post("/neutres/generator")
    */
    public function getSimpleExplodedAction(Request $request )
    {
        
        $phrases =  ( new Sentence( $request->request->get('sentences') ))->explode();
        $ret = [];
        foreach( $phrases as $phrase ) {
            $ret[] = (new Neutre())->setPhrase($phrase)->setIdLanguage(1);
        }
        return $ret;
    }

    
}
