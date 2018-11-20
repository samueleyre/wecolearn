<?php

namespace WcBundle\Controller;

use WcBundle\Entity\User;
use WcBundle\Entity\Token;
use WcBundle\Constant\TokenConstant;
use WcBundle\Entity\Tag;


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
use JMS\Serializer\SerializationContext;




class UserController extends Controller
{

  /**
   * @Get("client")
   * @View(serializerEnableMaxDepthChecks=true)
   **/
  public function getUserAction(Request $request  )
  {


    $user = $this->get('security.token_storage')->getToken()->getUser();

    $subDomain = $this->get('domain.service')->getSubDomain($request);
    $domain = $this->get('domain.service')->getSubDomainEntity($subDomain);

    if (false === $user->getDomains()->indexOf($domain)) {
      $user->addDomain($domain);
    }

    $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
    $user->setUserUpdated($date);

    $this->get("user.service")->patch($user);

    return $user;


  }


  /**
   * @Get("client/matchs")
   * @View( serializerGroups={"search"})
   */
  public function getUserMatchsAction(Request $request )
  {

    $first = $request->query->get( 'first', 0 );
    $max = $request->query->get( 'max', 6 );

    $filter = ['first' => $first,'max' => $max ];

    if ($request->get("tag")) {
      $filter["tag"] = $request->get("tag");
    }

    $user = $this->get('security.token_storage')->getToken()->getUser();

    $domain = $this->get('domain.service')->getSubDomain($request);

    return $this
      ->get('search.service')
      ->search($user, $filter, $domain  );

  }

  /**
   * @Post("/client/changesettings")
   * @ParamConverter(
   * "message",
   * class="WcBundle\Entity\User",
   * converter="fos_rest.request_body",
   * options={"deserializationContext"={"groups"={"input"} } }
   * )
   */
  public function changeSettingsAction( Request $request )
  {
    $userManager = $this->get('fos_user.user_manager');
    $user = $this->get('security.token_storage')->getToken()->getUser();
    $ret = [];


    if ($email = $request->get("email")) {

      $email = strtolower($email);
      $searchEmail = $this->getDoctrine()->getRepository(User::class)->findOneBy(["emailCanonical" => $email ]);

      if ($user->getEmailCanonical() === $email) {

        $ret['noChange'] = true;

      } else if ( $searchEmail ) {

        $ret["duplicate"] = true;

      } else {

        $user->setEmail($email);
        $user->setEmailConfirmed(false);

        $token = $this->get("token.service")->setNewToken($user, TokenConstant::$types["CONFIRMEMAIL"], true);

        $user->addEmailToken($token);

        $data = $this
          ->get('email.service')
          ->setData(6, ["HOST"=>$this->get("domain.service")->getHost($request), "TOKEN" => $token->getToken(), "USERNAME"=>$user->getUsername()], $user->getEmail())
          ->sendEmail();

        $this
          ->get('user.service')
          ->patch($user);


      }


    } else if ( $password = $request->get("password")) {

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
        $ret["error"] = "error".$e;

      }


    }

    $ret["user"] = $user;

    return $ret;





  }



  /**
   * @Patch("/client")
   * @ParamConverter(
   *       "user",
   *       class="WcBundle\Entity\User",
   *       converter="fos_rest.request_body",
   *       options={"deserializationContext"={"groups"={"input"} } }
   * )
   */
  public function patchUserAction( User $user )
  {

    return $this
      ->get('user.service')
      ->patch($user);

  }


  /**
   * @Get("confirmEmail/{token}")
   */
  public function confirmEmailAction ( $token)
  {

    $token =  $this->getDoctrine()
      ->getRepository(Token::class)
      ->findOneBy(["token"=>$token, "type"=> TokenConstant::$types["CONFIRMEMAIL"]]);

    $ret = [];

    if ($token && ($user = $token->getUser()) ) {

      if ($user->getEmailConfirmed() === false) {
        $user->setEmailConfirmed(true);
        $ret["success"] = $this
          ->get('user.service')
          ->patch($user, $user->getId());
      } else {
        $ret["error"] = "token_already_confirmed";
      }

      $this
        ->get('token.service')
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
  public function connectSlackAction(Request $request)
  {
// todo: should be a post
    $ret = [];

    if ( ($code = $request->query->get("code") ) && ( $redirect_uri = $request->query->get("redirect_uri") )) {

      $redirect_uri = rawurldecode($redirect_uri);

      $response = $this
        ->get('user.service')
        ->getSlackUserData($code, $redirect_uri);


      if ($response->code === 200 && $response->body->ok) {


        $user = $this->get('security.token_storage')->getToken()->getUser();

        $slackAccount = $this->get('slack.service')->getSlackAccount($response->body->user->id);

        if ($slackAccount ) { // in case slack account is connected to an other account
          //todo: before doing this, ask user if its ok with him
          $slackAccount->setUser($user);
          $this->get('slack.service')->patchSlackAccount($slackAccount);
        } else {
          $this->get('slack.service')->createSlackAccount($user, $response->body->user->id, $response->body->team->id, "slack");
        }

        return $this->get('user.service')->patch( $user );

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
   *
   */
  public function sendEmailForPasswordResetAction(Request $request)
  {

    $ret = null;
    if ( $email = $request->query->get( 'email' ) ) {
      $ret = [];

      $user = $this->getDoctrine()
        ->getRepository(User::class)
        ->findOneBy(["email"=>$email]);

      if ($user) {

        $token = $this->get("token.service")->setNewToken($user, TokenConstant::$types["CONFIRMEMAILPASSWORD"], true);

        $user->addEmailToken($token);

        $this
          ->get('user.service')
          ->patch($user, $user->getId());

        $this->get('token.service')->post($token);

        $this
          ->get('email.service')
          ->setData(7, ["HOST"=>$this->get("domain.service")->getHost($request), "TOKEN" => $token->getToken(), "USERNAME"=>$user->getUsername()], $user->getEmail())
          ->sendEmail();

        $ret["success"] = "Email envoyé";
      } else {
        $ret["error"] = "Email non trouvé";
      }

    }

    return $ret;

  }

  /**
   * @Post("/resetPassword/password")
   *
   */
  public function resetPasswordAction(Request $request)
  {

    $ret = null;
    if ( ( $password = $request->request->get( 'password' ) ) && ( $token = $request->request->get( 'token' )) ) {
      $ret = [];

      $tokenEntity = $this->getDoctrine()
        ->getRepository(Token::class)
        ->findOneBy(["token"=>$token, "type"=>TokenConstant::$types["CONFIRMEMAILPASSWORD"]]);

      if ($tokenEntity) {
        $user = $tokenEntity->getUser();
        $user->setPlainPassword($password);
        $this->get('fos_user.user_manager')->updateUser($user);
        $this
          ->get('token.service')
          ->remove($tokenEntity);

        $ret["success"] = "Mot de passe modifié";
      } else {
        $ret["error"] = "Token non valide";
      }



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
   * @get("/client/delete")
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

    $ret = [];

    $ret['userDelete'] = $this->get('fos_user.user_manager')->updateUser($user);
    $ret['ok'] = true;
    return $ret;

  }


}