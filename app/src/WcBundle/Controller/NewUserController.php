<?php

namespace WcBundle\Controller;


use WcBundle\Entity\User;
use WcBundle\Entity\Token;
use WcBundle\Constant\TokenConstant;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;

use FOS\RestBundle\View\ViewHandler;
use FOS\RestBundle\View\View; // Utilisation de la vue de FOSRestBundle

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\DBAL\Exception\NotNullConstraintViolationException;
//use Doctrine\DBAL\Exception\PDOException;
use Symfony\Component\Debug\ExceptionHandler;
use Symfony\Component\Debug\ErrorHandler;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use WcBundle\Entity\SlackAccount;


class NewUserController extends Controller
{


    /**
     * @Post("newuser")
     * @ParamConverter(
    "user",
    class="WcBundle\Entity\User",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"input"} } }
    )
     */
    public function postNewUserAction(User $user, Request $request)
    {

      return $this->createNewUser($user, $request);

    }

  /**
   * @Get("login_check/slack")
   *
   */
  public function newSlackUserAction(Request $request)
  {


    if (($code = $request->query->get("code")) && ($redirect_uri = $request->query->get("redirect_uri"))) {


      $response = $this
        ->get('user.service')
        ->getSlackUserData($code, $redirect_uri);

      if ($response->code === 200 && $response->body->ok) {


        $response->body->user->email;

        $randPwd = bin2hex(random_bytes(10));
        $email = $response->body->user->email;

        $ret = [];
        if ( $user = $this
          ->get('user.service')
          ->em
          ->getRepository(User::class)
          ->findOneBy(['email'=>$email])) { // todo: or if found by slack user id !


          if (!$this->get('slack.service')->getSlackAccount($response->body->user->id)) {
            $this->get('slack.service')->createSlackAccount($user, $response->body->user->id, $response->body->team->id, "slack");
          }

          $domainName = $this->get('domain.service')->getSubDomain($request);
          $domain = $this->get('domain.service')->getSubDomainEntity($domainName);

          if (!$domain) {
            $domain = $this->get('domain.service')->createSubDomainEntity($domainName);
          }

          if (false === $user->getDomains()->indexOf($domain)) {
            $user->addDomain($domain);
          }

          $this->get('user.service')->patch( $user, $user->getId() );


        } else {

          $user = new User();
          $user->setEmail($email);
          $user->setPassword($randPwd);
          $user->setUsername($response->body->user->name);
          //todo: also get avatar ! and team name !
          $this->createNewUser($user, $request, $response->body->user->id, $response->body->team->id ,false);
          $ret['subscribe']= true;
        }

        $token = $this->get('lexik_jwt_authentication.jwt_manager')->create($user);


        $ret['token']=$token;
        return $ret;


      } else {
        return $response->body->error;
      }


    } else {
      return null;
    }
  }

  private function createNewUser(User $user, $request, $slackId = null, $slackTeamId = null, $retEmail = true) {

    $ret = [];

    $userManager = $this->get('fos_user.user_manager');

    $domainName = $this->get('domain.service')->getSubDomain($request);
    $domain = $this->get('domain.service')->getSubDomainEntity($domainName);

    if (!$domain) {
      $domain = $this->get('domain.service')->createSubDomainEntity($domainName);
    }


    $user->setRoles(['ROLE_USER']);
    $user->setPlainPassword($user->getPassword());
    $user->setEnabled(true);
    $user->addDomain($domain);
    $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
    $user->setCreated($date);


    if ( $this
        ->get('user.service')
        ->em
        ->getRepository(User::class)
        ->findOneBy(['username'=>$user->getUsername()])) {
      $user->setUsername($user->getUsername().rand(10,100));
    }

    $user->setFirstName($user->getUsername());
    $this
      ->get('user.service')
      ->generateUrl($user);


    try {
    $userManager->updateUser($user);

    } catch (NotNullConstraintViolationException $e) {
      // Found the name of missed field
      return "notnull";
    } catch (UniqueConstraintViolationException $e) {
      // Found the name of duplicate field
      return "duplicate";
    } catch (\Exception $e) {

      //for debugging you can do like this
      return "error".$e;

    }

    if ($slackId !== null && $slackTeamId !== null) {
      $slackAccount = $this->get('slack.service')->getSlackAccount($slackId);
      if (!$slackAccount) {
        $this->get('slack.service')->createSlackAccount($user, $slackId, $slackTeamId, "slack");
      } else {
//     todo:   account already connected to email : xxxxx, do you wish to connected to this account ?
      }
    }


    if ($retEmail) {
      $token = $this
        ->get("token.service")
        ->setNewToken($user, TokenConstant::$types["CONFIRMEMAIL"], true);

      $emailSender = $this->getParameter("delivery_address");
      $retEmail = $this
        ->get('email.service')
        ->setData(3, ["TOKEN" => $token->getToken(), "HOST"=> $this->get("domain.service")->getHost($request), "USERNAME"=>$user->getUsername()], $user->getEmail(), $emailSender)
        ->sendEmail();
      if (isset($retEmail['code'])) {
        $ret["email"] = $retEmail['code'];
      }
    }


    return $ret;

  }



}
