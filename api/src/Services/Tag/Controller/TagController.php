<?php

namespace App\Services\Tag\Controller;

use App\Services\Tag\Entity\Tag;
use App\Services\Tag\Entity\TagDomain;
use Doctrine\Common\Collections\Collection;
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

    /**
     * @Get("tag/domains-popular-as-tags")
     * @param Request $request
     * @return Collection|Tag[]
     */
    public function getTagPopularAction(Request $request)
    {
//      todo:  add cache to this request !
        $limit = 8;
        if ($request->get('limit')) {
            $limit = $request->get('limit');
        }

        $tagDomains = $this->getDoctrine()
            ->getRepository(TagDomain::class)
            ->findBy([], null, $limit);

        $linkedTags = array_map(function($tagDomain) {
            return $tagDomain->getLinkedTag();
        }, $tagDomains);

        return array_filter($linkedTags, function($linkedTag) {
            return $linkedTag !== null;
        });
    }




}
