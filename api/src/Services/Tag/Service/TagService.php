<?php

namespace App\Services\Tag\Service;

use App\Services\Tag\Entity\Tag;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;

class TagService
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

    private function initializeNewTag(Tag &$tag)
    {
        $date = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
        $tag->setIteration(1);
        $tag->setCreated($date);
    }

    public function beforePatchTags(Collection $oldUserTags, Collection $tags)
    {
        for ($i = 0; $i < count($tags); ++$i) {
            $oldTag = $this->em
                ->getRepository(Tag::class)
                ->findOneBy(['name' => $tags[$i]->getName(), 'type' => $tags[$i]->getType()]);

            if ($oldTag) {
                if (!$oldUserTags->contains($oldTag)) {
                    $this->addIterationTag($oldTag);
                }
                // if tag already exists, we get the old one and replace it in the persisted variable
                $tags[$i] = $oldTag;
            } else {
                $this->initializeNewTag($tags[$i]);
            }

            if (!$oldUserTags->contains($tags[$i])) {
                $oldUserTags->add($tags[$i]);
            }
        }

        return $oldUserTags;
    }

    public function getAll()
    {
        return $this->em->getRepository(Tag::class)->findBy([], ['created' => 'DESC']);
    }

    private function addIterationTag(Tag &$tag)
    {
        $tag->setIteration($tag->getIteration() + 1);
    }

    public function patchIteration(int $id, int $iteration)
    {
        $tag = $this->em->getRepository(Tag::class)->find($id);
        $tag->setIteration($iteration);
        $this->em->merge($tag);
        $this->em->flush();
        return $tag;
    }

    public function delete(int $id)
    {
        $tag = $this->em->getRepository(Tag::class)->find($id);
        $this->em->remove($tag);
        $this->em->flush();
        return new Response();
    }

    public function getAllByImportance()
    {
        return $this->em->getRepository(Tag::class)->findBy([], ['iteration' => 'DESC']);
    }

    public function create(Tag $tag)
    {
        $this->initializeNewTag($tag);
        $this->em->persist($tag);
        $this->em->flush();
        return $tag;
    }
}
