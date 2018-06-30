<?php

namespace WcBundle\Controller;

use WcBundle\Entity\Client;
use AppBundle\Entity\User;
use WcBundle\Entity\Tag;
use AppBundle\Entity\Token;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;
use  FOS\RestBundle\Controller\Annotations\View;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Pagination\Annotation as Pagination;

use JMS\Serializer\Annotation as Serializer;

use JMS\Serializer\SerializationContext;


//TODO : usefull :     * @View(serializerGroups={"test"})



class ClientController extends GPPDController
{

    protected $entityRef = 'WcBundle:Client';

    // "options_client" [OPTIONS] /client
    public function optionClientAction()
    {
        return $this->optionAction();

    }

    /**
	   * @Get("client")
     * @View(serializerEnableMaxDepthChecks=true)
     **/
    public function getClientAction( )
    {


        $user = $this->get('security.token_storage')->getToken()->getUser();

        $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));

        $client = $this->getDoctrine()
            ->getRepository(Client::class)
            ->findOneBy(["user"=>$user]);

        $client->setClientUpdated($date);

        $this->get("client.service")->patch($client, null, false, false);

        return $client;


    }

    /**
     * @Get("client/matchs")
     */
    public function getClientMatchsAction(Request $request )
    {

        $first = $request->query->get( 'first', 0 );
        $max = $request->query->get( 'max', 6 );

        $filter = ['first' => $first,'max' => $max ];

        if ($request->get("tag")) {
            $filter["tag"] = $request->get("tag");
        }

        $user = $this->get('security.token_storage')->getToken()->getUser();

        $client = $this->getDoctrine()
            ->getRepository(Client::class)
            ->findOneBy(["user"=>$user]);

        return $this
            ->get('search.service')
            ->search($client, $filter );

    }

    /**
     * @Post("/client/changesettings")
     * @ParamConverter(
      "message",
      class="AppBundle\Entity\User",
      converter="fos_rest.request_body",
      options={"deserializationContext"={"groups"={"input"} } }
      )
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

          $token = new Token();
          $token->setToken(bin2hex(random_bytes(16)));

          $token->setUser($user);
          $user->setEmailToken($token);

          $this->get('token.service')->post($token);



          $data = $this
            ->get('email.service')
            ->setData(6, ["HOST"=>$this->getParameter("host"), "TOKEN" => $token->getToken(), "USERNAME"=>$user->getUsername()], $user->getEmail())
            ->sendEmail();

          $this
            ->get('user.service')
            ->patch($user);

          $ret["emailChange"] = $data["code"];

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


      return $ret;





    }



    /**
    * @Patch("/client")
    * @ParamConverter(
            "client",
            class="WcBundle\Entity\Client",
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
	  */
    public function patchClientAction( Client $client, Request $request )
    {

        $user = $this->get('security.token_storage')->getToken()->getUser();

        return $this
            ->get('client.service')
            ->patch($client,$user);

    }


    /**
     * @Get("confirmEmail/{token}")
     */
    public function confirmEmailAction ( $token)
    {

      $token =  $this->getDoctrine()
        ->getRepository(Token::class)
        ->findOneBy(["token"=>$token]);

      $ret = [];

      if ($token && $user = $token->getUser() ) {

        if ($user->getEmailConfirmed() === false) {
          $user->setEmailConfirmed(true);
          $ret["success"] = $this->patchAction($user);
        } else {
          $ret["error"] = "token_already_confirmed";
        }


      } else {
        $ret["user"] = $token->getUser();
        $ret["error"] = "confirmation_token_not_found";
      }

      return $ret;
    }
//
//    /**
//    * @Delete("/client/{id}")
//    */
//    public function deleteClientAction( $id , Request $request )
//    {
//
//        $this->deleteAction( $id );
//
//        return $this->getClientAction();
//    }


}
