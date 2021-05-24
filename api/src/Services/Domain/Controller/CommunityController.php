<?php

namespace App\Services\Domain\Controller;

use App\Services\Domain\Service\DomainService;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CommunityController extends AbstractController
{


    /**
     * @Get("community/invite/{token}")
     * @param TokenStorageInterface $tokenStorage
     * @return boolean
     * @throws \Exception
     */
    public function getCommunityAction(
        string $token,
        TokenStorageInterface $tokenStorage,
        DomainService $domainService
    ): bool
    {
        $user = $tokenStorage->getToken()->getUser();
        return $domainService->addUserToCommunityWithInviteToken($user, $token);
    }

}
