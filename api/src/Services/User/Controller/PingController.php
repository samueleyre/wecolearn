<?php

namespace App\Services\User\Controller;

use App\Services\Chat\Service\MercureCookieGenerator;
use App\Services\User\Entity\User;
use Exception;
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
    private UserManagerInterface $userManager;

    public function __construct(UserManagerInterface $userManager)
    {
        $this->userManager = $userManager;
    }

    /**
     * @Get("ping" )
     *
     * @param Request $request
     * @param TokenStorageInterface $tokenStorage
     * @param SerializerInterface $serializer
     * @param MercureCookieGenerator $cookieGenerator
     * @param LoggerInterface $logger
     * @return Response
     * @throws Exception
     */
    public function getAction(Request $request, TokenStorageInterface $tokenStorage, SerializerInterface $serializer, MercureCookieGenerator $cookieGenerator, LoggerInterface $logger): Response
    {
        $user = $tokenStorage->getToken()->getUser();
        $user->setLastConnexion(new \DateTime('now', new \DateTimeZone('Europe/Paris')));
        $this->userManager->updateUser($user);


        $response = new Response(
            $serializer->serialize($user, 'json', SerializationContext::create()->setGroups('profile'))
        );

        /*
         * Manage cookie for mercureAuthorization
         * if cookie is expired generate a new one
         */

        if (!$request->cookies->get('mercureAuthorization')) {
            $response->headers->set('set-cookie', $cookieGenerator->generate($user)->__toString());
        } else {
            /*
             * If cookie not correct, make a new one
             * todo: move this to a login listener ?
             */
            $currentCookie = $request->cookies->get('mercureAuthorization');
            $shouldBe = $cookieGenerator->generate($user);
            if ($currentCookie !== $shouldBe->getValue()) {
                $response->headers->set('set-cookie', $shouldBe->__toString());
            }

        }

        
        return $response;
    }
}
