<?php

namespace App\Services\Domain\Controller;

use App\Services\Domain\Entity\Domain;
use App\Services\Domain\Service\DomainService;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CommunityController extends AbstractController
{


    /**
     * @Get("community/invite/{token}")
     * @param TokenStorageInterface $tokenStorage
     * @View( serializerGroups={"community-invite"})
     * @return boolean
     * @throws \Exception
     */
    public function getCommunityInviteAction(
        string $token,
        TokenStorageInterface $tokenStorage,
        DomainService $domainService
    ): Domain
    {
        $user = $tokenStorage->getToken()->getUser();
        return $domainService->addUserToCommunityWithInviteToken($user, $token);
    }

}
