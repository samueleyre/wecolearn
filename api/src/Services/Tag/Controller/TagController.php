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
        $tagLetters = "";
        $type = null;
        $max = 5;

        if ($request->get('tagLetters')) {
            $tagLetters = $request->get('tagLetters');
        }

        if ($request->query->has('type')) {
            $type = $request->get('type');
        }

        if ($request->get('max')) {
            $max = $request->get('max');
        }

        return $this->getDoctrine()
                ->getRepository(Tag::class)
                ->findAllOrderedByIteration($tagLetters, $type, $max);
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

    /**
     * @Get("tag/domains-popular")
     */
    public function getTagPopularDomainsAction()
    {
//      todo:  add cache to this request !

        $ret = $this->getDoctrine()
            ->getRepository(TagDomain::class)
            ->getPopular(8);

        return $ret;
    }



}
