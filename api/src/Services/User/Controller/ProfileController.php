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
use App\Services\User\Service\ChangeEmailService;
use App\Services\User\Service\UserService;
use Doctrine\DBAL\Exception\NotNullConstraintViolationException;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\UserBundle\Model\UserManagerInterface;
use Hoa\Exception\Exception;
use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\Config\Definition\Exception\DuplicateKeyException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class ProfileController extends AbstractController
{
    /**
     * @Get("profile")
     * @View(serializerEnableMaxDepthChecks=true, serializerGroups={"profile"})
     * @param TokenStorageInterface $tokenStorage
     * @param DomainService $domainService
     * @param UserService $userService
     * @param LoggerInterface $logger
     * @return UserInterface
     */
    public function getProfileAction(
        TokenStorageInterface $tokenStorage,
        DomainService $domainService,
        UserService $userService,
        LoggerInterface $logger
    ): UserInterface
    {
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
     * @param User $user
     * @param TokenStorageInterface $tokenStorage
     * @param UserService $userService
     * @return UserInterface
     */
    public function patchProfileAction(User $user, TokenStorageInterface $tokenStorage, UserService $userService ): UserInterface
    {
        return $userService
            ->patch($user);
    }

    /**
     * @Post("/profile/changesettings")
     * @View( serializerGroups={"profile"})
     * )
     * @param Request $request
     * @param TokenStorageInterface $tokenStorage
     * @param ChangeEmailService $changeEmailService
     * @param UserManagerInterface $userManager
     * @param EncoderFactoryInterface $encoderService
     * @return UserInterface
     */
    public function changeSettingsAction(
        Request $request,
        TokenStorageInterface $tokenStorage,
        ChangeEmailService $changeEmailService,
        UserManagerInterface $userManager,
        EncoderFactoryInterface $encoderService
    ): UserInterface
    {
        $user = $tokenStorage->getToken()->getUser();
        if ($email = $request->get('email')) {
            $email = strtolower($email);
            $searchEmail = $this->getDoctrine()
                ->getRepository(User::class)->findOneBy(['emailCanonical' => $email]);

            if ($user->getEmailCanonical() === $email) {
                throw new HttpException(304, 'no change');
            } elseif ($searchEmail) {
                throw new HttpException(409, 'duplicate');
            } else {
                return $changeEmailService->process($user, $email);
            }
        } elseif (
            ($password = $request->get('password')) &&
            ($newPassword = $request->get('newPassword'))
        ) {

            $encoder = $encoderService->getEncoder($user);

            if (!$encoder->isPasswordValid($user->getPassword(), $password, $user->getSalt())) {
                throw new HttpException(400, 'wrong password');
            }

            $user->setPlainPassword($newPassword);

            try {
                $userManager->updateUser($user);
                return $user;
            } catch (NotNullConstraintViolationException $e) {
                // Found the name of missed field
                throw new HttpException(400, 'not null');
            } catch (\Exception $e) {
                syslog(LOG_ERR, "error changing password $e");
            }
        }

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
