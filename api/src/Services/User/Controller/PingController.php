<?php

namespace App\Services\User\Controller;

use App\Services\Chat\Service\MercureCookieGenerator;
use App\Services\User\Entity\User;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\UserBundle\Model\UserManagerInterface;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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
    public function getAction(Request $request, TokenStorageInterface $tokenStorage, SerializerInterface $serializer, MercureCookieGenerator $cookieGenerator)
    {
        $user = $tokenStorage->getToken()->getUser();
        $user->setLastConnexion(new \DateTime('now', new \DateTimeZone('Europe/Paris')));
        $this->userManager->updateUser($user);
        $response = new Response(
            $serializer->serialize($user, 'json', SerializationContext::create()->setGroups('output'))
        );
        $response->headers->set('set-cookie', 'mercureAuthorization', $cookieGenerator->generate($user));
        return $response;
    }
}
