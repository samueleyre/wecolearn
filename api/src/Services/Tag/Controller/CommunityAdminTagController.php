<?php

namespace App\Services\Tag\Controller;

use App\Services\Tag\Entity\Tag;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CommunityAdminTagController extends AbstractController
{
    /**
     * @Get("community-admin/tags-in-community/{communityId}")
     * @View( serializerGroups={"admin-tags"})
     * @param int $communityId
     * @param TokenStorageInterface $tokenStorage
     * @return mixed
     * @throws \Exception
     */
    public function getTagsInCommunityAction(
        int $communityId,
        TokenStorageInterface $tokenStorage
    ) {

        $user = $tokenStorage->getToken()->getUser();

        if(
        !($user->isSuperAdmin() || $user->hasDomain($communityId))
        ) {
            throw new \Exception('Non autorisé !', 403);
        }

        return $this->getDoctrine()
            ->getRepository(Tag::class)
            ->getAllInCommunityByImportance($communityId);

    }
}
