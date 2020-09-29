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
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;

class ProfileController extends AbstractController
{
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
     * @Post("/profile/changesettings")
     * @View( serializerGroups={"profile"})
     * )
     */
    public function changeSettingsAction(
        Request $request,
        TokenStorageInterface $tokenStorage,
        ChangeEmailService $changeEmailService,
        UserManagerInterface $userManager,
        EncoderFactoryInterface $encoderService
    ) {
        $user = $tokenStorage->getToken()->getUser();
        $ret = [];
        if ($email = $request->get('email')) {
            $email = strtolower($email);
            $searchEmail = $this->getDoctrine()
                ->getRepository(User::class)->findOneBy(['emailCanonical' => $email]);

            if ($user->getEmailCanonical() === $email) {
                $ret['noChange'] = true;
            } elseif ($searchEmail) {
                $ret['duplicate'] = true;
            } else {
                $user = $changeEmailService->process($user, $email);
            }
        } elseif (
            ($password = $request->get('password')) &&
            ($newPassword = $request->get('newPassword'))
        ) {

            $encoder = $encoderService->getEncoder($user);

            if (!$encoder->isPasswordValid($user->getPassword(), $password, $user->getSalt())) {
                return ['wrong'=> true];
            }

            $user->setPlainPassword($newPassword);

            try {
                $userManager->updateUser($user);
                $ret['changed'] = true;
            } catch (NotNullConstraintViolationException $e) {
                // Found the name of missed field
                $ret['notnull'] = true;
            } catch (UniqueConstraintViolationException $e) {
                // Found the name of duplicate field
                $ret['duplicate'] = true;
            } catch (\Exception $e) {
                syslog(LOG_ERR, "error changing password $e");
            }
        }

        $ret['user'] = $user;
        return $ret;
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
