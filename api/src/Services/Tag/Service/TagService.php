<?php

namespace App\Services\Tag\Service;

use App\Services\Tag\Entity\Tag;
use App\Services\Tag\Entity\TagDomain;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
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

    public function beforePatchTags(Collection $oldUserTags, Collection $newTags)
    {
        $patchedTags = new ArrayCollection();
        foreach ($newTags as $newTag) {

            $existingTag = ($newTag->id)
                ? $this->em->getRepository(Tag::class)->find($newTag->getId())
                : $this->em->getRepository(Tag::class)
                    ->findOneBy(['name' => $newTag->getName(), 'type' => $newTag->getType()]);

            // if exists, add to collection
            if ($existingTag) {
                if (!$oldUserTags->contains($existingTag)) {
                    $this->addIterationTag($existingTag);
                }

                if(!$patchedTags->contains($existingTag)) {
                    $patchedTags->add($existingTag);
                }
            // otherwise create it
            } else {
                $patchedTags->add($this->create($newTag));
            }

        }

        return $patchedTags;
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
        $name = $tag->getName();
        $oldTag = $this->em->getRepository(Tag::class)->find($tag->getId());
        if ($oldTag) {
            $oldTag->setIteration($iteration);
            $oldTag->setName($name);

            if (count($tag->getTagDomains()) > 0) {
                foreach( $tag->getTagDomains() as $tagDomain) {
                    $tagDomain = $this->em->getRepository(TagDomain::class)->find($tagDomain->getId());
                    $oldTag->addTagDomain($tagDomain);
                }
            }

            $this->em->persist($oldTag);
            $this->em->flush();
            return $oldTag;
        }
        throw new ResourceNotFoundException('tag not found');
    }

    public function merge($params): ?object
    {

        $oldTag = $this->em->getRepository(Tag::class)->find($params['oldTagId']);
        $mergedTag = $this->em->getRepository(Tag::class)->find($params['mergedTagId']);

        if ($oldTag->getType() !== $mergedTag->getType()) {
           throw new \LogicException('Must be of same type');
        }

        // get userIds with old tag
        $users = $oldTag->getUsers();

        // connect those userIds with the mergedTagId
        foreach ($users as $user) {
            if (!$user->getTags()->contains($mergedTag)) {
                $mergedTag->addUser($user);
                $user->addTag($mergedTag);
                $this->em->persist($user);
                $this->em->flush();
            }
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

//        todo: if is linked to tagDomain -->> don't delete !
        $isLinked = $this->em->getRepository(TagDomain::class)->findBy(['linkedTag'=>$tag]);
        if ($isLinked) {
            throw new \Exception('This tag is linked to a tagDomain !');
        }

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

        // fill from database
        $tagDomains = new ArrayCollection();
        foreach ($tag->getTagDomains() as $td) {
            $tagDomains->add($this->em->getRepository(TagDomain::class)->find($td->getId()));
        }
        $tag->getTagDomains()->clear();
        foreach ($tagDomains as $td) {
            $tag->addTagDomain($td);
        }

        $this->em->persist($tag);
        $this->em->flush();
        return $tag;
    }

    public function resetCount() {

    }
}
