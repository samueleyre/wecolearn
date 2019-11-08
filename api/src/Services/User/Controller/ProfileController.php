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
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ProfileController extends AbstractController
{
    /**
     * @Get("profile/{profileUrl}")
     * @View(serializerEnableMaxDepthChecks=true, serializerGroups={"profile"})
     **/
    public function getProfileAction(string $profileUrl)
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
     * @View(serializerEnableMaxDepthChecks=true,
     *     serializerGroups={"output", "receivedMessages":{"output", "sender":{"search"}}})
     * // todo: specifying subchild groups isn't working
     *
     **@throws \Exception
     */
    public function getUserAction(
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
     * @Get("/profile/delete")
     */
    public function deleteUserAction()
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $user->setUsername('rand'.$user->getId());
        $user->setEmail('rand'.$user->getId());
        $user->setPassword('rand'.$user->getId());
        $user->setEnabled(0);
        $user->setFirstName('rand'.$user->getId());
        $user->setLastName('rand'.$user->getId());
        $user->setProfilUrl('rand'.$user->getId());
        $user->setBiographie(null);
        $user->setImage(null);
        $user->setShowProfil(false);
        $user->getTags()->clear();
        $user->getSlackAccounts()->clear();
        $user->getDomains()->clear();
        $user->setLatitude(null);
        $user->setLongitude(null);
        $user->setEmailNotifications(false);
        $user->setDeleted(new \DateTime('now', new \DateTimeZone('Europe/Paris')));

        $ret = [];

        $ret['userDelete'] = $this->get('fos_user.user_manager')->updateUser($user);
        $ret['ok'] = true;

        return $ret;
    }
}
