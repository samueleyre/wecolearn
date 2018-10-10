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

      return $this->createNewUser($user, null, $this->get('domain.service')->getSubDomain($request));

    }

  /**
   * @Get("login_check/slack")
   *
   */
  public function newSlackUserAction(Request $request)
  {


    if ($code = $request->query->get("code")) {

      if ( $request->query->get("redirect_uri")) {
        $redirect_uri = rawurldecode($request->query->get("redirect_uri"));
      } else {
        $subDomain = $this->get('domain.service')->getSubDomain($request);
        if ($subDomain === "wecolearn") {
          $subDomain = '';
        } else {
          $subDomain .= '.';
        }
        if ( "dev" === $this->getParameter("environment")) {
          $redirect_uri = "http://0.0.0.0:8080/login";
        } else {
          $redirect_uri = "https://".$subDomain."wecolearn.com/login";
        }

      }

      $response = $this
        ->get('client.service')
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
          ->findOneBy(['email'=>$email])) {

          $client = $this
            ->get('client.service')
            ->em
            ->getRepository(Client::class)
            ->findOneBy(['user'=>$user] );

          $change = false;
          if (null === $client->getSlackId() ) {
            $client->setSlackId($response->body->user->id);
            $change = true;
          }

          $domain = $this->get('domain.service')->getSubDomain($request);
          if ("wecolearn" !== $domain && $domain !== $client->getDomain() ) {
            $client->setDomain($domain);
            $change = true;
          }

          if ($change) {
            $this->get('client.service')->em->merge( $client );
            $this->get('client.service')->em->flush();
          }


        } else {

          $user = new User();
          $user->setEmail($email);
          $user->setPassword($randPwd);
          $user->setUsername($response->body->user->name);
          //todo: also get avatar !
          $this->createNewUser($user, $response->body->user->id, $this->get('domain.service')->getSubDomain($request));
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

  private function createNewUser(User $user, $slackId = null, $domain = "wecolearn") {

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

    $client->setDomain($domain);


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
