<?php

namespace App\Services\User\Controller;

use App\Services\Core\Exception\ResourceAlreadyUsedException;
use App\Services\Domain\Service\DomainService;
use App\Services\User\AsyncBusMessage\InviteFriendBusMessage;
use App\Services\User\Constant\TokenConstant;
use App\Services\User\Entity\PushNotificationSubscription;
use App\Services\User\Entity\Subscription;
use App\Services\User\Entity\Token;
use App\Services\User\Entity\User;
use App\Services\User\SyncEvent\EmailChangeConfirmed;
use App\Services\User\Service\CreateTokenForChangingPasswordService;
use App\Services\User\Service\CreateUserService;
use App\Services\User\Service\SearchService;
use App\Services\User\Service\TokenService;
use App\Services\User\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use FOS\UserBundle\Model\UserManagerInterface;
use phpDocumentor\Reflection\Types\Integer;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\Annotations\Delete;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;

class UserController extends AbstractController
{

    private UserManagerInterface $userManager;
    private EncoderFactoryInterface $encoderService;

    public function __construct(UserManagerInterface $userManager, EncoderFactoryInterface $encoderService)
    {
        $this->userManager = $userManager;
        $this->encoderService = $encoderService;
    }

    /**
     * @Get("user/{profileUrl}")
     * @View(serializerEnableMaxDepthChecks=true, serializerGroups={"public-profile"})
     * @param string $profileUrl
     * @return User
     * @throws Exception
     */
    public function getPublicProfileAction(string $profileUrl): User
    {
        $user = $this
            ->getDoctrine()
            ->getRepository(User::class)
            ->findOneByProfilUrl($profileUrl);

        if ($user instanceof User) {
            return $user;
        }

        throw new NotFoundHttpException('not found');
    }

    /**
     * @Post("user/matchs")
     * @View( serializerGroups={"search"})
     * @param Request $request
     * @param TokenStorageInterface $tokenStorage
     * @param DomainService $domainService
     * @param SearchService $searchService
     * @return array
     */
    public function getUserMatchsAction(
        Request $request,
        TokenStorageInterface $tokenStorage,
        DomainService $domainService,
        SearchService $searchService
    ): array
    {

        // parameters :
        // first, max, tag, tag_domain, global, useProfileTags, userLearnTags, userLearnTagDomains, userKnowTags, userKnowTagDomains, domain

        $filter = [
            'first' => $request->get('first', 0),
            'max' => $request->get('max', 12),
        ];

        $domain = $request->get('domain');

        $searchParameters = [
            'global' => $request->get('global', false),
            'domainId' => $domain ? $domain['id'] : null,
            'useProfileTags' => $request->get('useProfileTags', true),
            'userLearnTags' => $request->get('userLearnTags', true),
            'userLearnTagDomains' => $request->get('userLearnTagDomains', false),
            'userKnowTags' => $request->get('userKnowTags', false),
            'userKnowTagDomains' => $request->get('userKnowTagDomains', false),
        ];

        $tag = $request->get('tag', ['id' => null, 'name' => null]);
        $tagDomain = $request->get('tagDomain', null);

        if (
            (array_key_exists('id', $tag) && $tag['id'])
            || (array_key_exists('name', $tag) && $tag['name'])
        ) {
            $filter['tag'] = $tag;
        } else if ($tagDomain) {
            $filter['tagDomain'] = $tagDomain;
        }

        $user = $tokenStorage->getToken()->getUser();

        return $searchService
            ->search($searchParameters, $filter, $user);
    }

    /**
     * @Get("confirmEmail/{tokenString}")
     * @View( serializerGroups={"profile"})
     * @param $tokenString
     * @param UserService $userService
     * @param TokenService $tokenService
     * @param EventDispatcherInterface $dispatcher
     * @return User
     * @throws Exception
     */
    public function confirmEmailAction($tokenString, UserService $userService, TokenService $tokenService, EventDispatcherInterface $dispatcher): User
    {
        $token = $this->getDoctrine()
            ->getRepository(Token::class)
            ->findOneBy(['token' => $tokenString, 'type' => TokenConstant::$types['CONFIRMEMAIL']]);

        if ($token && ($user = $token->getUser())) {
            if (false === $user->getEmailConfirmed()) {
                $user->setEmailConfirmed(true);
                $ret = $userService->patch($user, $user->getId());
                $tokenService->remove($token);
                $dispatcher->dispatch(new EmailChangeConfirmed($user), EmailChangeConfirmed::NAME);
                return $ret;
            } else {
                throw new Exception("token_already_confirmed", 409);
            }

        }
        throw new Exception("confirmation_token_not_found", 404);

    }

    /**
     * @Post("inviteFriend")
     * @View( serializerGroups={"id"})
     * @param Request $request
     * @param MessageBusInterface $messageBusInterface
     * @throws Exception
     */
    public function inviteFriendAction(Request $request, MessageBusInterface $messageBusInterface)
    {

        $friendEmail = $request->get('email');

//        todo: use uuid !
        $id = $request->get('userId');
        if (!$friendEmail || !$id) {
            throw new Exception('missing data', 500);
        }

        $messageBusInterface->dispatch(new InviteFriendBusMessage($id, $friendEmail));
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
    )
    {
        try {
            $ret = null;
            if ($email = $request->query->get('email')) {
                $ret = [];
                try {
                    $res = $service->process($email);
                } catch (Exception $e) {
                    exit();
                }
                if ($res instanceof Token) {
                    $ret['success'] = 'Email envoyé';
                } else {
                    $ret['error'] = 'NOT_FOUND';
                }
            }
        } catch (Exception $e) {
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
    )
    {
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
        } catch (Exception $e) {
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

        syslog(LOG_ERR, sprintf("########### SUBSCRIPTION WITH token : %s . ########################", $token));

        // get subscriptions with same token
        $subscriptions = $em->getRepository(PushNotificationSubscription::class)->findBy(['user' => $user, 'token' => $token, 'type' => $type]);

        $update = false;

        syslog(LOG_ERR, count($subscriptions));

        if (0 === count($subscriptions)) {
            $oldSubscriptions = $em->getRepository(PushNotificationSubscription::class)->findBy(['user' => $user, 'type' => $type]);
            foreach ($oldSubscriptions as $oldSubscription) {
                $em->remove($oldSubscription);
            }

            $subscription = new PushNotificationSubscription();
            $subscription->setUser($user);
            $subscription->setToken($token);
            $subscription->setType($type);

            $em->persist($subscription);
            $em->persist($user);
            $em->flush();

        }


        return ['success' => true];
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
