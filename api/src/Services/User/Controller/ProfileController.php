<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 09/03/19
 * Time: 15:33.
 */

namespace App\Services\User\Controller;

use App\Services\Domain\Entity\Domain;
use App\Services\Domain\Service\DomainService;
use App\Services\User\Entity\User;
use App\Services\User\Service\UserService;
use FOS\RestBundle\Controller\Annotations\Patch;
use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ProfileController extends AbstractController
{
    /**
     * @Get("profile/{profileUrl}")
     * @View(serializerEnableMaxDepthChecks=true, serializerGroups={"public-profile"})
     **/
    public function getPublicProfileAction(string $profileUrl)
    {
        $user = $this
            ->getDoctrine()
            ->getRepository(User::class)
            ->findOneByProfilUrl($profileUrl);

        if ($user instanceof User) {
            $ret = $user;
        } else {
            $ret = ['success' => false];
        }

        return $ret;
    }

    /**
     * @Get("profile")
     * @View(serializerEnableMaxDepthChecks=true, serializerGroups={"profile"})
     **/
    public function getProfileAction(
        Request $request,
        TokenStorageInterface $tokenStorage,
        DomainService $domainService,
        UserService $userService,
        LoggerInterface $logger
    ) {
        $user = $tokenStorage->getToken()->getUser();

        $subDomain = $domainService->getSubDomain();

        $domain = $domainService->getSubDomainEntity($subDomain);

        if (!$domain) {
            $logger->error('Subdomain not found :', [$subDomain]);
            $user->addDomain(new Domain($subDomain));
        } elseif (false === $user->getDomains()->indexOf($domain)) {
            $user->addDomain($domain);
        }

        $date = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
        $user->setUserUpdated($date);

        $userService->patch($user);

        return $user;
    }

    /**
     * @Patch("/profile")
     * @View(serializerEnableMaxDepthChecks=true, serializerGroups={"profile"})
     * @ParamConverter(
     *       "user",
     *       class="App\Services\User\Entity\User",
     *       converter="fos_rest.request_body",
     *       options={"deserializationContext"={"groups"={"input"} } }
     * )
     */
    public function patchProfileAction(User $user, TokenStorageInterface $tokenStorage, UserService $userService )
    {
        return $userService
            ->patch($user);
    }

    /**
     * @Get("/profile/delete")
     */
    public function deleteProfileAction(
        UserService $userService
    ) {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        return $userService->delete($user->getId());
    }
}
