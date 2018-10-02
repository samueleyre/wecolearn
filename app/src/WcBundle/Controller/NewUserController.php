<?php

namespace WcBundle\Controller;


use AppBundle\Entity\User;
use WcBundle\Entity\Client;
use AppBundle\Entity\Token;
use AppBundle\Constant\TokenConstant;


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

use AppBundle\Pagination\Annotation as Pagination;

use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\DBAL\Exception\NotNullConstraintViolationException;
use Symfony\Component\Debug\ExceptionHandler;
use Symfony\Component\Debug\ErrorHandler;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;





class NewUserController extends GPPDController
{

    protected $entityRef = 'AppBundle:User';


    // "options_newuser" [OPTIONS] /newuser
    public function optionNewUserAction()
    {
        return $this->optionAction();

    }

    /**
     * @Post("newuser")
     * @ParamConverter(
    "user",
    class="AppBundle\Entity\User",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"input"} } }
    )
     */
    public function postNewUserAction(User $user, Request $request)
    {

      return $this->createNewUser($user);

    }

  /**
   * @Get("login_check/slack")
   *
   */
  public function newSlackUserAction(Request $request)
  {

/*
 * array (
  'code' => 200,
  'raw_body' => '{"ok":true,"access_token":"xoxp-5014201828-5014201838-447410966998-33ecd4bfe7fa8c0da1d07b9c55c8f37f","scope":"identify,chat:write:bot,identity.basic,identity.email,identity.avatar,identity.team","user":{"name":"samueleyre","id":"U050E5XQN","email":"samuel.eyre@hotmail.fr","image_24":"https:\\/\\/avatars.slack-edge.com\\/2015-10-31\\/13630758087_48a26b7102ef27df0d85_24.jpg","image_32":"https:\\/\\/avatars.slack-edge.com\\/2015-10-31\\/13630758087_48a26b7102ef27df0d85_32.jpg","image_48":"https:\\/\\/avatars.slack-edge.com\\/2015-10-31\\/13630758087_48a26b7102ef27df0d85_48.jpg","image_72":"https:\\/\\/avatars.slack-edge.com\\/2015-10-31\\/13630758087_48a26b7102ef27df0d85_72.jpg","image_192":"https:\\/\\/avatars.slack-edge.com\\/2015-10-31\\/13630758087_48a26b7102ef27df0d85_72.jpg","image_512":"https:\\/\\/avatars.slack-edge.com\\/2015-10-31\\/13630758087_48a26b7102ef27df0d85_72.jpg","image_1024":"https:\\/\\/avatars.slack-edge.com\\/2015-10-31\\/13630758087_48a26b7102ef27df0d85_72.jpg"},"team":{"id":"T050E5XQC"}}',
  'body' =>
  array (
    'ok' => true,
    'access_token' => 'xoxp-5014201828-5014201838-447410966998-33ecd4bfe7fa8c0da1d07b9c55c8f37f',
    'scope' => 'identify,chat:write:bot,identity.basic,identity.email,identity.avatar,identity.team',
    'user' =>
    array (
      'name' => 'samueleyre',
      'id' => 'U050E5XQN',
      'email' => 'samuel.eyre@hotmail.fr',
      'image_24' => 'https://avatars.slack-edge.com/2015-10-31/13630758087_48a26b7102ef27df0d85_24.jpg',
      'image_32' => 'https://avatars.slack-edge.com/2015-10-31/13630758087_48a26b7102ef27df0d85_32.jpg',
      'image_48' => 'https://avatars.slack-edge.com/2015-10-31/13630758087_48a26b7102ef27df0d85_48.jpg',
      'image_72' => 'https://avatars.slack-edge.com/2015-10-31/13630758087_48a26b7102ef27df0d85_72.jpg',
      'image_192' => 'https://avatars.slack-edge.com/2015-10-31/13630758087_48a26b7102ef27df0d85_72.jpg',
      'image_512' => 'https://avatars.slack-edge.com/2015-10-31/13630758087_48a26b7102ef27df0d85_72.jpg',
      'image_1024' => 'https://avatars.slack-edge.com/2015-10-31/13630758087_48a26b7102ef27df0d85_72.jpg',
    ),
    'team' =>
    array (
      'id' => 'T050E5XQC',
    ),
  ),
  'headers' =>
  array (
    0 => 'HTTP/1.1 200 OK',
    'Content-Type' => 'application/json; charset=utf-8',
    'Content-Length' => '335',
    'Connection' => 'keep-alive',
    'Date' => 'Mon, 01 Oct 2018 10:46:37 GMT',
    'Server' => 'Apache',
    'X-Slack-Exp' => '1',
    'X-Slack-Backend' => 'h',
    'x-slack-router' => 'p',
    'Referrer-Policy' => 'no-referrer',
    'Strict-Transport-Security' => 'max-age=31536000; includeSubDomains; preload',
    'X-Slack-Req-Id' => 'c9bec20d-4691-4239-a6ae-cad184d3c7ee',
    'X-XSS-Protection' => '0',
    'X-Content-Type-Options' => 'nosniff',
    'Vary' => 'Accept-Encoding',
    'Content-Encoding' => 'gzip',
    'Access-Control-Allow-Origin' => '*',
    'X-Via' => 'haproxy-www-rb7f',
    'X-Cache' => 'Miss from cloudfront',
    'Via' => '1.1 433bf30dfb22e94fd993ce42989c86e8.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id' => 'gDXO8uGoE2M7igPgIy8LXvIglZ0e9KZFBRH72DOgIzT0k32qKLVRMA==',
  ),
)
 *
 *
 */

    if ($code = $request->query->get("code")) {


      $response = $this
        ->get('client.service')
        ->getSlackUserData($code);


      if ($response->code === 200 && $response->body->ok) {


        $response->body->user->email;

        $randPwd = bin2hex(random_bytes(10));
        $email = $response->body->user->email;


        if ( $user = $this
          ->get('user.service')
          ->em
          ->getRepository(User::class)
          ->findOneBy(['email'=>$email])) {

          $token = $this->get('lexik_jwt_authentication.jwt_manager')->create($user);

          return ['token'=>$token];

        } else {

          $user = new User();
          $user->setEmail($email);
          $user->setPassword($randPwd);
          $user->setUsername($response->body->user->name);
          //todo: also get avatar !
          return $this->createNewUser($user, $response->body->user->id);
        }


      } else {
        return $response->body->error;
      }


    } else {
      return null;
    }
  }

  private function createNewUser(User $user, $slackId = null) {

    $userManager = $this->get('fos_user.user_manager');


    $user->setRoles(['ROLE_USER']);

    $user->setPlainPassword($user->getPassword());
    $user->setPassword(null); // WHAT IS THE DIFFERENCE ?
    $user->setEnabled(true);


    if ( $this
        ->get('user.service')
        ->em
        ->getRepository(User::class)
        ->findOneBy(['username'=>$user->getUsername()])) {
      $user->setUsername($user->getUsername().rand(10,100));
    }


    try {
    $userManager->updateUser($user);

    } catch (NotNullConstraintViolationException $e) {
      // Found the name of missed field
      return "notnull";
    } catch (UniqueConstraintViolationException $e) {
      // Found the name of duplicate field
      return "duplicate".$e;
    } catch (\Exception $e) {

      //for debugging you can do like this
      return "error".$e;

    }

    // if username is duplicate and comes from slack, add random number afterwards


    $token = new Token();
    $token->setToken(bin2hex(random_bytes(16)));
    $token->setUser($user);
    $token->setType(TokenConstant::$types["CONFIRMEMAIL"]);



    $this
      ->get('token.service')
      ->post($token);


//        $roles = $user->getRoles();
//        if (in_array("ROLE_USER", $roles)) { // not useful at this point as it is always the case.

    $client = new Client();
    $client->setUser($user);
    $client->setFirstName($user->getUsername());

    $client->setDomain($this->get('domain.service')->getSubDomain());


    if ($slackId !== null) {
      $client->setSlackId($slackId);
    }

    $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
    $client->setCreated($date);


    $this
      ->get('client.service')
      ->generateUrl($client);

    $emailSender = $this->getParameter("delivery_address");
    $host = $this->getParameter("host");

    $data = $this
      ->get('email.service')
      ->getData(3, ["TOKEN" => $token->getToken(), "HOST"=>$host, "USERNAME"=>$user->getUsername()], $user->getEmail(), $emailSender);


    $ret = [];

    $retEmail = $this
      ->get('sendinblue_api')
      ->send_transactional_template($data);

    if (isset($retEmail['code'])) {
      $ret["email"] = $retEmail['code'];
    }

    $ret['insertUser'] = $this
      ->postAction($client); // why post on user ? todo: stop using gppdcontroller

    return $ret;

  }



}