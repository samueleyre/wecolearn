<?php

namespace App\Services\Tag\Controller;

use App\Services\Tag\Entity\Tag;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class TagController extends AbstractController
{
    /**
     * @Get("findTag")
     */
    public function getTagAction(Request $request)
    {
        $tagLetters = null;
        if ($request->get('tagLetters')) {
            $tagLetters = $request->get('tagLetters');
        }

        $ret = $this->getDoctrine()
                ->getRepository(Tag::class)
                ->findAllOrderedByIteration($tagLetters);

        return $ret;
    }



}
