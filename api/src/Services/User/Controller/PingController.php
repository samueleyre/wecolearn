<?php

namespace App\Services\User\Controller;

use App\Services\Chat\Service\MercureCookieGenerator;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\UserBundle\Model\UserManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class PingController extends AbstractController
{
    private $userManager;

    public function __construct(UserManagerInterface $userManager)
    {
        $this->userManager = $userManager;
    }

    /**
     * @Get("ping" )
     *
     * @throws \Exception
     */
    public function getAction(Request $request, TokenStorageInterface $tokenStorage)
    {
        $user = $tokenStorage->getToken()->getUser();
        $user->setLastConnexion(new \DateTime('now', new \DateTimeZone('Europe/Paris')));
        $this->userManager->updateUser($user);

        return $user;
    }
}
