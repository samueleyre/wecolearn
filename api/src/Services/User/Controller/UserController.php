<?php

namespace App\Services\User\Controller;

use App\Services\Core\Exception\ResourceAlreadyUsedException;
use App\Services\Domain\Service\DomainService;
use App\Services\Tag\Entity\Tag;
use App\Services\User\Constant\TokenConstant;
use App\Services\User\Entity\PushNotificationSubscription;
use App\Services\User\Entity\Subscription;
use App\Services\User\Entity\Token;
use App\Services\User\Entity\User;
use App\Services\User\Service\ChangeEmailService;
use App\Services\User\Service\CreateTokenForChangingPasswordService;
use App\Services\User\Service\CreateUserService;
use App\Services\User\Service\SearchService;
use App\Services\User\Service\TokenService;
use App\Services\User\Service\UserService;
use Doctrine\DBAL\Exception\NotNullConstraintViolationException;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use phpDocumentor\Reflection\Types\Integer;
use PhpParser\Error;
use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\Annotations\Delete;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;

class UserController extends AbstractController
{

    private $userManager;
    private $encoderService;

    public function __construct(UserManagerInterface $userManager, EncoderFactoryInterface $encoderService)
    {
        $this->userManager = $userManager;
        $this->encoderService = $encoderService;
    }


    /**
     * @Post("user/matchs")
     * @View( serializerGroups={"search"})
     */
    public function getUserMatchsAction(
        Request $request,
        TokenStorageInterface $tokenStorage,
        DomainService $domainService,
        SearchService $searchService
    ) {

//        first, max, tag, global, useProfileTags

        $filter = [
            'first' => $request->get('first', 0),
            'max' => $request->get('max', 6),
            'global' => $request->get('global', false),
            'useProfileTags' => $request->get('useProfileTags', true)
        ];

        $tag = $request->get('tag', ['id'=>null, 'name'=>null]);

        if (
            ( array_key_exists('id', $tag) && $tag['id'] )
            || ( array_key_exists('id', $tag) && $tag['name'] )
        ) {
            $filter['tag'] = $tag;
        }

        $user = $tokenStorage->getToken()->getUser();

        $domain = $domainService->getSubDomain();

        return $searchService
            ->search($user, $filter, $domain);
    }

    /**
     * @Post("/user/changesettings")
     * @View( serializerGroups={"profile"})
     * )
     */
    public function changeSettingsAction(
        Request $request,
        TokenStorageInterface $tokenStorage,
        ChangeEmailService $changeEmailService
    ) {
        $user = $tokenStorage->getToken()->getUser();
        $ret = [];
        try {
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

                $encoder = $this->encoderService->getEncoder($user);

                if (!$encoder->isPasswordValid($user->getPassword(), $password, $user->getSalt())) {
                    return [
                        'wrong'=> true,
                    ];
                }

                $user->setPlainPassword($newPassword);

                try {
                    $this->userManager->updateUser($user);
                    $ret['changed'] = true;
                } catch (NotNullConstraintViolationException $e) {
                    // Found the name of missed field
                    $ret['notnull'] = true;
                } catch (UniqueConstraintViolationException $e) {
                    // Found the name of duplicate field
                    $ret['duplicate'] = true;
                } catch (\Exception $e) {

                }
            }
        } catch (\Exception $e) {
            exit();
        }

        $ret['user'] = $user;

        return $ret;
    }


    /**
     * @Get("confirmEmail/{tokenString}")
     * @View( serializerGroups={"profile"})
     */
    public function confirmEmailAction($tokenString, UserService $userService, TokenService $tokenService)
    {
        $token = $this->getDoctrine()
            ->getRepository(Token::class)
            ->findOneBy(['token' => $tokenString, 'type' => TokenConstant::$types['CONFIRMEMAIL']]);

        $ret = [];

        if ($token && ($user = $token->getUser())) {
            if (false === $user->getEmailConfirmed()) {
                $user->setEmailConfirmed(true);
                $ret['success'] = $userService
                    ->patch($user, $user->getId());
            } else {
                $ret['error'] = 'token_already_confirmed';
            }

            $tokenService->remove($token);
        } else {
            $ret['error'] = 'confirmation_token_not_found';
        }

        return $ret;
    }

//          ---------------
//    --------- ADMIN -------------
//          ---------------

    /**
     * @Get("admin/user/{id}")
     * @View(serializerEnableMaxDepthChecks=true,
     *     serializerGroups={"output", "receivedMessages":{"output", "sender":{"search"}}})
     **
     * @return object
     */
    public function findUserAction(
        Integer $id,
        UserService $userService
    ) {
        return $userService->findById($id);
    }

    /**
     * @Get("admin/users")
     * @View( serializerGroups={"admin-users"})
     * @return object[]
     */
    public function getUsersAction(
        UserService $userService
    ) {
        return $userService->getAll();
    }

    /**
     * @Post("admin/user")
     * @ParamConverter(
        "user",
        class="App\Services\User\Entity\User",
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
        )
     */
    public function addUserAction(
        User $user,
        CreateUserService $service
    ) {
        $user->setPassword('NotDefinedYet');

        try {
            return $service->process($user);
        } catch (ResourceAlreadyUsedException $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
    }

    /**
     * @Patch("admin/user")
     * @ParamConverter(
     *       "user",
     *       class="App\Services\User\Entity\User",
     *       converter="fos_rest.request_body",
     *       options={"deserializationContext"={"groups"={"input"} } }
     * )
     */
    public function patchUserAction(User $user, UserService $userService)
    {
        return $userService
            ->patch($user, $user->getId());
    }

    /**
     * @Delete("admin/user/{id}")
     * @return string
     */
    public function deleteUserAction(
        int $id,
        UserService $userService
    ) {
        return $userService->delete($id);
    }


//          ---------------
//    --------- AUTH -------------
//          ---------------


    /**
     * @Get("resetPassword/email")
     * @View( serializerGroups={"search"})
     */
    public function sendEmailForPasswordResetAction(
        Request $request,
        CreateTokenForChangingPasswordService $service
    ) {
        try {
            $ret = null;
            if ($email = $request->query->get('email')) {
                $ret = [];
                try {
                    $res = $service->process($email);
                } catch (\Exception $e) {
                    exit();
                }
                if ($res instanceof Token) {
                    $ret['success'] = 'Email envoyé';
                } else {
                    $ret['error'] = 'NOT_FOUND';
                }
            }
        } catch (\Exception $e) {
            exit();
        }

        return $ret;
    }

    /**
     * @Post("/resetPassword/password")
     * @View( serializerGroups={"search"})
     */
    public function resetPasswordAction(
        Request $request,
        TokenService $tokenService
    ) {
        $ret = null;
        try {
            if (($password = $request->request->get('password')) && ($token = $request->request->get('token'))) {
                $ret = [];

                $tokenEntity = $this->getDoctrine()
                    ->getRepository(Token::class)
                    ->findOneBy(['token' => $token, 'type' => TokenConstant::$types['CONFIRMEMAILPASSWORD']]);

                if ($tokenEntity) {
                    $user = $tokenEntity->getUser();
                    $user->setPlainPassword($password);
                    $this->userManager->updateUser($user);
                    $tokenService
                        ->remove($tokenEntity);

                    $ret['success'] = 'Mot de passe modifié';
                } else {
                    $ret['error'] = 'Token non valide';
                }
            }
        } catch (\Exception $e) {
            exit();
        }

        return $ret;
    }

    /**
     * @Get("resetPassword/token")
     */
    public function checkPasswordTokenAction(Request $request)
    {
        $ret = null;
        if ($token = $request->query->get('token')) {
            $ret = [];

            $tokenEntity = $this->getDoctrine()
                ->getRepository(Token::class)
                ->findOneBy(['token' => $token, 'type' => TokenConstant::$types['CONFIRMEMAILPASSWORD']]);

            if ($tokenEntity) {
                $ret['success'] = 'ok';
            } else {
                $ret['error'] = 'Token non trouvé';
            }
        }

        return $ret;
    }

    //
    //  /**
    //   * @Get("user/slack")
    //   *
    //   */
//    public function connectSlackAction(Request $request, UserService $userService, TokenStorageInterface $tokenStorage, SlackService $slackService)
//    {
    //  // todo: should be a post
//        $ret = [];
//
//        if (($code = $request->query->get("code") ) && ( $redirect_uri = $request->query->get("redirect_uri") )) {
//            $redirect_uri = rawurldecode($redirect_uri);
//
//            $response = $userService
//            ->getSlackUserData($code, $redirect_uri);
//
//
//            if ($response->code === 200 && $response->body->ok) {
//                $user = $tokenStorage->getToken()->getUser();
//
//                $slackAccount = $slackService->getSlackAccount($response->body->user->id);
//
//                if ($slackAccount) { // in case slack account is connected to an other account
//                  //todo: before doing this, ask user if its ok with him
//                    $slackAccount->setUser($user);
//                    $slackService->patchSlackAccount($slackAccount);
//                } else {
//                    $slackService->createSlackAccount($user, $response->body->user->id, $response->body->team->id, "slack");
//                }
//
//                return $userService->patch($user);
//            } else {
//                $ret['error'] = $response->body->error;
//            }
//
//            return $ret;
//        } else {
//            return null;
//        }
//    }
//




//             ---------------
//    --------- NOTIFICATIONS -------------
//             ---------------




//    /**
//     * @Get("/user/notified")
//     */
//    public function userNotifiedAction(TokenStorageInterface $tokenStorage)
//    {
//        $ret = [];
//
//        $user = $tokenStorage->getToken()->getUser();
//
//        $user->setUserNotified(new \DateTime('now', new \DateTimeZone('Europe/Paris')));
//        $ret['userNotified'] = $this->get('fos_user.user_manager')->updateUser($user);
//        $ret['success'] = true;
//
//        return [];
//    }

    /**
     * for service worker
     * @Post("/user/notification/check-if-exist-or-add-and-subscribe")
     */
    public function checkIfSubscriptionExistOrAddAndSubscribeAction(Request $request, EntityManagerInterface $em, TokenStorageInterface $tokenStorage)
    {
        $user = $tokenStorage->getToken()->getUser();

        $data = json_decode($request->getContent(), true);

        $endpoint = $data['endpoint'];
        $auth = $data['keys']['auth'];
        $p256dh = $data['keys']['p256dh'];
        $agent = $request->headers->get('User-Agent');

        $subscriptions = $em->getRepository(Subscription::class)->findBy(['user' => $user, 'endpoint' => $endpoint, 'agent' => $agent]);

        $unusedSubs = $em->getRepository(Subscription::class)->getUnused($user, $agent);
        $removed = 0;
        foreach ($unusedSubs as $unusedSub) {
            $em->remove($unusedSub);
            ++$removed;
        }

        $update = false;

        if (0 === count($subscriptions)) {
            $subscription = new Subscription();
            $subscription->setUser($user);
            $subscription->setEndpoint($endpoint);
            $subscription->setAuth($auth);
            $subscription->setP256dh($p256dh);
            $subscription->setAgent($agent);

            $em->persist($subscription);
            $update = true;
        }

        $user->setNotificationSubscribe(true);
        $em->merge($user);
        $em->flush();

        return ['update' => $update, 'removed' => $removed];
    }

    /**
     * for android
     * @Post("/user/notification/check-if-exist-or-add-and-subscribe-notif")
     */
    public function checkIfSubscriptionExistOrAddAndSubscribeNotifAction(Request $request, EntityManagerInterface $em, TokenStorageInterface $tokenStorage)
    {
        $user = $tokenStorage->getToken()->getUser();

        $data = json_decode($request->getContent(), true);

        $token = $data['id'];
        $type = $data['type'];

        if ($type === 'android') {
            $type = TokenConstant::$types['ANDROID_NOTIFICATION_SUBSCRIPTION'];
        }

        syslog(LOG_ERR, sprintf("########### SUBSCRIPTION WITH token : %s . ########################",$token));

        $subscriptions = $em->getRepository(PushNotificationSubscription::class)->findBy(['user' => $user, 'token' => $token, 'type' => $type]);

        $update = false;

        syslog(LOG_ERR , count($subscriptions));

        if (0 === count($subscriptions)) {
            $subscription = new PushNotificationSubscription();
            $subscription->setUser($user);
            $subscription->setToken($token);
            $subscription->setType($type);

            $em->persist( $subscription );
            $em->persist( $user );
            $em->flush();

        }


        return ['success' => true ];
    }


//    /**
//     * @Post("/user/notification/unsubscribe")
//     */
//    public function notificationUnsubscribeAction(EntityManagerInterface $em, TokenStorageInterface $tokenStorage)
//    {
//        $user = $tokenStorage->getToken()->getUser();
//        $user->setNotificationSubscribe(false);
//        $em->merge($user);
//        $em->flush();
//
//        return [];
//    }
}
