<?php

namespace WcBundle\Controller;

use WcBundle\Entity\Tag;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Pagination\Annotation as Pagination;




class TagController extends GPPDController
{
    
    protected $entityRef = 'WcBundle:Tag';

    // "options_tag" [OPTIONS] /tag
    public function optionTagAction()
    {
        return $this->optionAction();
        
    } 
    
    /**
	* @Get("findTag")
    */
    public function getTagAction( Request $request )
    {


        if ($tagLetters = $request->get("tagLetters")) {
            return $this->getDoctrine()
                ->getRepository(Tag::class)
                ->findAllOrderedByIteration($tagLetters);
        } else {
            return "nothing";
        }




	}
    




}
