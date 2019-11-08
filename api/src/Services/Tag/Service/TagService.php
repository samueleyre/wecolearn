<?php

namespace App\Services\Tag\Service;

use App\Services\Tag\Entity\Tag;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

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

    private function insertNewTag(Tag &$tag)
    {
        try {
            $date = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
        } catch (\Exception $e) {
        }
        $tag->setIteration(1);

        $tag->setCreated($date);
    }

    public function patchTags(Collection $oldUserTags, Collection $tags)
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
                $this->insertNewTag($tags[$i]);
            }

            if (!$oldUserTags->contains($tags[$i])) {
                $oldUserTags->add($tags[$i]);
            }
        }

        return $oldUserTags;
    }

    private function addIterationTag(Tag &$tag)
    {
        $tag->setIteration($tag->getIteration() + 1);
    }
}
