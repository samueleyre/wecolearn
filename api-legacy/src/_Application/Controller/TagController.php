<?php

namespace App\_Application\Controller;

use App\_Tag\DomainModel\Tag\Tag;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;



class TagController extends Controller
{

    /**
	* @Get("findTag")
    */
    public function getTagAction( Request $request )
    {

        $tagLetters = null;
        if ($request->get("tagLetters")) {
            $tagLetters = $request->get("tagLetters");
        }

        $ret = $this->getDoctrine()
                ->getRepository(Tag::class)
                ->findAllOrderedByIteration($tagLetters);

        return $ret;
    }
}
