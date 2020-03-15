<?php

namespace App\Services\Tag\Controller;

use App\Services\Tag\Entity\Tag;
use App\Services\Tag\Entity\TagDomain;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class TagController extends AbstractController
{
    /**
     * @Get("tag/find")
     */
    public function getTagAction(Request $request)
    {
        $tagLetters = null;
        $type = null;
        if ($request->get('tagLetters')) {
            $tagLetters = $request->get('tagLetters');
        }

        if ($request->query->has('type')) {
            $type = $request->get('type');
        }

        return $this->getDoctrine()
                ->getRepository(Tag::class)
                ->findAllOrderedByIteration($tagLetters, $type);
    }


    /**
     * @Get("tag/domains")
     */
    public function getTagDomainsAction(Request $request)
    {
        $literal = null;
        if ($request->get('literal')) {
            $literal = $request->get('literal');
        }

        $ret = $this->getDoctrine()
            ->getRepository(TagDomain::class)
            ->findByNameLike($literal);

        return $ret;
    }



}
