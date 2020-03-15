<?php

namespace App\Services\Tag\Service;

use App\Services\Tag\Entity\Tag;
use App\Services\Tag\Entity\TagDomain;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

class TagDomainService
{
    public $em;
    public $container;

    public function __construct(
        EntityManagerInterface $em,
        ContainerInterface $container
    ) {
        $this->em = $em;
        $this->container = $container;
    }

    public function create(TagDomain $tagDomain)
    {
        $date = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
        $tagDomain->setCreated($date);
        $this->em->persist($tagDomain);
        $this->em->flush();
        return $tagDomain;
    }

    public function patchTagDomain(Tagdomain $tagDomain)
    {
        $name = $tagDomain->getName();
        $emoji = $tagDomain->getEmoji();
        $oldTagDomain = $this->em->getRepository(TagDomain::class)->find($tagDomain->getId());
        if ($oldTagDomain) {
            $oldTagDomain->setName($name);
            $oldTagDomain->setEmoji($emoji);
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
