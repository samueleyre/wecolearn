<?php

namespace App\Services\Domain\Controller;

use App\Services\Domain\Entity\Domain;
use App\Services\Domain\Service\DomainService;
use App\Services\Shared\Entity\Token;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CommunityController extends AbstractController
{


    /**
     * @Get("community/invite/{token}")
     * @param string $token
     * @param TokenStorageInterface $tokenStorage
     * @param DomainService $domainService
     * @return Domain
     * @throws \Exception
     * @View( serializerGroups={"community-invite"})
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

    /**
     * @Get("community/invite-check/{token}")
     * @View( serializerGroups={"community-invite"})
     * @param string $token
     * @return boolean
     */
    public function getCommunityInviteCheckAction(
        string $token
    ): bool
    {

        try {
            $this->getDoctrine()->getRepository(Token::class)->findOneBy(['token'=>$token])->getDomain();
        }
        catch (\Error | \Exception $e) {
            throw new HttpException(400, "token not valid");
        }

        return true;
    }


}
