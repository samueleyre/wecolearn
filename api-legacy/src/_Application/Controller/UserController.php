<?php

namespace App\_Application\Controller;

use App\_User\DomainModel\NotificationSubscription\Subscription;
use App\_User\DomainModel\User\ChangeEmailService;
use App\_User\DomainModel\User\CreateTokenForChangingPasswordService;
use App\_User\DomainModel\User\User;
use App\_User\DomainModel\Token\Token;
use App\_User\DomainModel\Token\TokenConstant;
use App\_Tag\DomainModel\Tag\Tag;


use App\_Application\Domain\DomainService;
use App\_Application\Infrastructure\Notification\Email\EmailService;
use App\_Search\DomainModel\Search\SearchService;
use App\WcBundle\Service\SlackService;
use App\_User\DomainModel\Token\TokenService;
use App\WcBundle\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use  FOS\RestBundle\Controller\Annotations\Get;
use  FOS\RestBundle\Controller\Annotations\Post;


use \Doctrine\Common\Collections\Collection;
use \Doctrine\Common\Collections\Criteria;

use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\View;


use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


class UserController extends Controller
{

  /**
   * @Get("client")
   * @View(serializerEnableMaxDepthChecks=true, serializerGroups={"output", "receivedMessages":{"output", "sender":{"search"}}}) // todo: specifying subchild groups isn't working
   *
   *
   **/
  public function getUserAction(
        Request $request ,
        TokenStorageInterface $tokenStorage,
        DomainService $domainService,
        UserService $userService
    ) {


    $user = $tokenStorage->getToken()->getUser();

    $subDomain = $domainService->getSubDomain($request);
    $domain = $domainService->getSubDomainEntity($subDomain);


    if (false === $user->getDomains()->indexOf($domain)) {
        $user->addDomain($domain);
    }

    $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
    $user->setUserUpdated($date);



    $userService->patch($user);

    return $user;


  }


  /**
   * @Get("client/matchs")
   * @View( serializerGroups={"search"})
   */
  public function getUserMatchsAction(
      Request $request,
      TokenStorageInterface $tokenStorage,
      DomainService $domainService,
      SearchService $searchService
    )
  {

    $first = $request->query->get( 'first', 0 );
    $max = $request->query->get( 'max', 6 );

    $filter = ['first' => $first,'max' => $max ];

    if ($request->get("tag")) {
      $filter["tag"] = $request->get("tag");
    }

    $user = $tokenStorage->getToken()->getUser();

    $domain = $domainService->getSubDomain($request);

    return $searchService
      ->search($user, $filter, $domain  );

  }

  /**
   * @Post("/client/changesettings")
   * @View( serializerGroups={"search"})
   * )
   */
  public function changeSettingsAction(
        Request $request,
        TokenStorageInterface $tokenStorage,
        ChangeEmailService $changeEmailService

    )
  {
    $userManager = $this->get('fos_user.user_manager');
    $user = $tokenStorage->getToken()->getUser();
    $ret = [];
    try {

            if ($email = $request->get("email")) {

                $email = strtolower($email);
                $searchEmail = $this->getDoctrine()->getRepository(User::class)->findOneBy(["emailCanonical" => $email]);

                if ($user->getEmailCanonical() === $email) {

                    $ret['noChange'] = true;

                } else if ($searchEmail) {

                    $ret["duplicate"] = true;

                } else {

                    return $changeEmailService->process($user, $email);

                }


            } else if ($password = $request->get("password")) {

                $user->setPlainPassword($password);

                try {
                    $userManager->updateUser($user);
                    $ret['changed'] = true;

                } catch (NotNullConstraintViolationException $e) {
                    // Found the name of missed field
                    $ret["notnull"] = true;
                } catch (UniqueConstraintViolationException $e) {
                    // Found the name of duplicate field
                    $ret["duplicate"] = true;
                } catch (\Exception $e) {

                    //for debugging you can do like this
                    $ret["error"] = "error" . $e;

                }



            }

    } catch( \Exception $e ) {
        dump( $e->getMessage());
        exit();
    }

    $ret["user"] = $user;

    return $ret;





  }



  /**
   * @Patch("/client")
   * @ParamConverter(
   *       "user",
   *       class="App\_User\DomainModel\User\User",
   *       converter="fos_rest.request_body",
   *       options={"deserializationContext"={"groups"={"input"} } }
   * )
   */
  public function patchUserAction( User $user, UserService $userService )
  {

    return $userService
      ->patch($user);

  }


  /**
   * @Get("confirmEmail/{token}")
   */
  public function confirmEmailAction ( $token , UserService $userService, TokenService $tokenService )
  {

    $token =  $this->getDoctrine()
      ->getRepository(Token::class)
      ->findOneBy(["token"=>$token, "type"=> TokenConstant::$types["CONFIRMEMAIL"]]);

    $ret = [];

    if ($token && ($user = $token->getUser()) ) {

      if ($user->getEmailConfirmed() === false) {
        $user->setEmailConfirmed(true);
        $ret["success"] = $userService
          ->patch($user, $user->getId());
      } else {
        $ret["error"] = "token_already_confirmed";
      }

      $tokenService
        ->remove($token);

    } else {
      $ret["error"] = "confirmation_token_not_found";
    }

    return $ret;
  }


  /**
   * @Get("client/slack")
   *
   */
  public function connectSlackAction(Request $request, UserService $userService, TokenStorageInterface $tokenStorage , SlackService $slackService )
  {
// todo: should be a post
    $ret = [];

    if ( ($code = $request->query->get("code") ) && ( $redirect_uri = $request->query->get("redirect_uri") )) {

      $redirect_uri = rawurldecode($redirect_uri);

      $response = $userService
        ->getSlackUserData($code, $redirect_uri);


      if ($response->code === 200 && $response->body->ok) {


        $user = $tokenStorage->getToken()->getUser();

        $slackAccount = $slackService->getSlackAccount($response->body->user->id);

        if ($slackAccount ) { // in case slack account is connected to an other account
          //todo: before doing this, ask user if its ok with him
          $slackAccount->setUser($user);
          $slackService->patchSlackAccount($slackAccount);
        } else {
          $slackService->createSlackAccount($user, $response->body->user->id, $response->body->team->id, "slack");
        }

        return $userService->patch( $user );

      } else {
        $ret['error'] = $response->body->error;
      }

      return $ret;


    } else {
      return null;
    }
  }



  /**
   * @Get("resetPassword/email")
   * @View( serializerGroups={"search"})
   */
  public function sendEmailForPasswordResetAction(
        Request $request, CreateTokenForChangingPasswordService $service
    )
  {

    try {
        $ret = null;
        if ($email = $request->query->get('email')) {
            $ret = [];
            try {
                $res = $service->process($email);

            } catch (\Exception $e) {
                dump($e->getMessage());
                exit();
            }
            if ($res instanceof Token) {
                $ret["success"] = "Email envoyé";
            } else {
                $ret["error"] = "Email non trouvé";
            }
        }
    } catch(\Exception $e ) {
        dump($e->getMessage());
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
                ->findOneBy(["token" => $token, "type" => TokenConstant::$types["CONFIRMEMAILPASSWORD"]]);

            if ($tokenEntity) {
                $user = $tokenEntity->getUser();
                $user->setPlainPassword($password);
                $this->get('fos_user.user_manager')->updateUser($user);
                $tokenService
                    ->remove($tokenEntity);

                $ret["success"] = "Mot de passe modifié";
            } else {
                $ret["error"] = "Token non valide";
            }
        }
    } catch(\Exception $e ) {
        dump($e->getMessage());
        exit();
    }

    return $ret;

  }



  /**
   * @Get("resetPassword/token")
   *
   */
  public function checkPasswordTokenAction(Request $request)
  {

    $ret = null;
    if ( $token = $request->query->get( 'token' ) ) {
      $ret = [];

      $tokenEntity = $this->getDoctrine()
        ->getRepository(Token::class)
        ->findOneBy(["token"=>$token, "type"=>TokenConstant::$types["CONFIRMEMAILPASSWORD"]]);

      if ($tokenEntity) {
        $ret['success'] = "ok";
      } else {
        $ret['error'] = "Token non trouvé";
      }

    }

    return $ret;

  }


  /**
   * @Get("/client/delete")
   */
  public function deleteUserAction()
  {

    $user = $this->get('security.token_storage')->getToken()->getUser();

    $user->setUsername("rand".$user->getId());
    $user->setEmail("rand".$user->getId());
    $user->setPassword("rand".$user->getId());
    $user->setEnabled(0);
    $user->setFirstName("rand".$user->getId());
    $user->setLastName("rand".$user->getId());
    $user->setProfilUrl("rand".$user->getId());
    $user->setBiographie(null);
    $user->setImage(null);
    $user->setShowProfil(false);
    $user->getTags()->clear();
    $user->getSlackAccounts()->clear();
    $user->getDomains()->clear();
    $user->setLatitude(null);
    $user->setLongitude(null);
    $user->setEmailNotifications(false);
    $user->setDeleted(new \DateTime("now", new \DateTimeZone('Europe/Paris')));

    $ret = [];

    $ret['userDelete'] = $this->get('fos_user.user_manager')->updateUser($user);
    $ret['ok'] = true;
    return $ret;

  }

  /**
   * @Get("/client/notified")
   */
  public function userNotifiedAction(TokenStorageInterface $tokenStorage)
  {
    $ret = [];

    $user = $tokenStorage->getToken()->getUser();

    $user->setUserNotified(new \DateTime("now", new \DateTimeZone('Europe/Paris')));
    $ret['userNotified'] = $this->get('fos_user.user_manager')->updateUser($user);
    $ret['success'] = true;

    return [];

  }

  /**
   * @Post("/client/notification/check-if-exist-or-add-and-subscribe")
   */
  public function checkIfSubscriptionExistOrAddAndSubscribeAction( Request $request, EntityManagerInterface $em, TokenStorageInterface $tokenStorage  ) {

      $user = $tokenStorage->getToken()->getUser();

      $data = json_decode($request->getContent(), true);

      $endpoint = $data['endpoint'];
      $auth = $data['keys']['auth'];
      $p256dh = $data['keys']['p256dh'];
      $agent = $request->headers->get('User-Agent');

      $subscriptions = $em->getRepository(Subscription::class)->findBy( ['user' => $user, 'endpoint' => $endpoint , 'agent' => $agent ]);

      $unusedSubs = $em->getRepository(Subscription::class)->getUnused($user, $agent );
      $removed = 0;
      foreach( $unusedSubs as $unusedSub) {
          $em->remove( $unusedSub );
          $removed++;
      }

      $update = false;

      if (count($subscriptions) === 0) {
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

      return [ 'update' => $update, 'removed' => $removed ];
  }

    /**
     * @Post("/client/notification/unsubscribe")
     */
    public function notificationUnsubscribeAction(  EntityManagerInterface $em, TokenStorageInterface $tokenStorage  ) {

        $user = $tokenStorage->getToken()->getUser();
        $user->setNotificationSubscribe( false );
        $em->merge($user);
        $em->flush();

        return [];
    }
}
