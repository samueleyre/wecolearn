<?php

namespace App\Services\Tag\Service;

use App\Services\Tag\Entity\Tag;
use App\Services\Tag\Entity\TagDomain;
use App\Services\User\Entity\User;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Hoa\Exception\Exception;
use PhpParser\Error;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

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

    public function patchTag(Tag $tag)
    {
        $iteration = $tag->getIteration();
        $tagDomain = $this->em->getRepository(TagDomain::class)->find($tag->getTagDomain()->getId());
        $name = $tag->getName();
        $oldTag = $this->em->getRepository(Tag::class)->find($tag->getId());
        if ($oldTag) {
            $oldTag->setIteration($iteration);
            $oldTag->setName($name);
            $oldTag->setTagDomain($tagDomain);
            $this->em->persist($oldTag);
            $this->em->flush();
            return $oldTag;
        }
        throw new ResourceNotFoundException('tag not found');
    }

    public function merge($params)
    {

        $oldTag = $this->em->getRepository(Tag::class)->find($params['oldTagId']);
        $mergedTag = $this->em->getRepository(Tag::class)->find($params['mergedTagId']);

        if ($oldTag->getType() !== $mergedTag->getType()) {
           throw new \RuntimeException('Must be of same type');
        }

        // get userIds with old tag
        $users = $oldTag->getUsers();

        // connect those userIds with the mergedTagId
        foreach ($users as $user) {
            $mergedTag->addUser($user);
            $user->addTag($mergedTag);
            $this->em->persist($user);
            $this->em->flush();
        }

        $this->em->persist($mergedTag);
        $this->em->flush();

        // delete old Tag
        $this->em->remove($oldTag);
        $this->em->flush();

        return $mergedTag;

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
