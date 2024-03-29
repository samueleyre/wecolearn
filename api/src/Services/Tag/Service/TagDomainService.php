<?php

namespace App\Services\Tag\Service;

use App\Services\Tag\Constant\TagConstant;
use App\Services\Tag\Entity\Tag;
use App\Services\Tag\Entity\TagDomain;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

class TagDomainService
{
    public EntityManagerInterface $em;
    public ContainerInterface $container;

    public function __construct(
        EntityManagerInterface $em,
        ContainerInterface $container
    ) {
        $this->em = $em;
        $this->container = $container;
    }

    public function create(TagDomain &$tagDomain)
    {

        $tagDomain->create();
        $sameNameTag = $this->em->getRepository(Tag::class)->findOneBy(['name'=>$tagDomain->getName(), 'type'=> TagConstant::$types['LEARNING']]);
        if ($sameNameTag) {
            // link existing tag
            $tagDomain->setLinkedTag($sameNameTag);
            $sameNameTag->addTagDomain($tagDomain);
            $this->em->persist($sameNameTag);
        }

        if (!$sameNameTag) {
            // create tag
            $tag = new Tag();
            $tag->setName($tagDomain->getName());
            $tag->setType(0);
            $tag->addTagDomain($tagDomain);
            $tagDomain->setLinkedTag($tag);
            $this->em->persist($tag);
        }

        $this->em->persist($tagDomain);
        $this->em->flush();

    }

    public function patchTagDomain(Tagdomain $tagDomain): object
    {
        $name = $tagDomain->getName();
        $emoji = $tagDomain->getEmoji();
        $hexcolor = $tagDomain->getHexcolor();
        $oldTagDomain = $this->em->getRepository(TagDomain::class)->find($tagDomain->getId());
        if ($oldTagDomain) {
            $oldTagDomain->setName($name);
            $oldTagDomain->setEmoji($emoji);
            $oldTagDomain->setHexcolor($hexcolor);

            // update linked tag
            $linkedTag = $oldTagDomain->getLinkedTag();
            $linkedTag->setName($name);

            $this->em->persist($linkedTag);
            $this->em->persist($oldTagDomain);
            $this->em->flush();
            return $oldTagDomain;
        }


        throw new ResourceNotFoundException('tag domain not found');
    }

    public function delete(int $id)
    {
        $tag = $this->em->getRepository(TagDomain::class)->find($id);
        $this->em->remove($tag);
        $this->em->flush();
        return new Response();
    }
}
