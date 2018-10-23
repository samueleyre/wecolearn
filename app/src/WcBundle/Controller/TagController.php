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

        return $this->getDoctrine()
            ->getRepository(Tag::class)
            ->findAllOrderedByIteration($tagLetters);
    }
}
