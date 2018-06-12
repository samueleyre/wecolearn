<?php

namespace WcBundle\Controller;


use AppBundle\Entity\User;
use WcBundle\Entity\Client;

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

        $userManager = $this->get('fos_user.user_manager');


        $user->setRoles(['ROLE_USER']);

        $user->setPlainPassword($user->getPassword());
        $user->setPassword(null); // WHAT IS THE DIFFERENCE ?

        $user->setConfirmationToken(bin2hex(random_bytes(16))); // todo : should be in toolkit class to update secure token generation
        $user->setEnabled(true);

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


        $roles = $user->getRoles();

        if (in_array("ROLE_USER", $roles)) {

          $client = new Client();
          $client->setUser($user);

          $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
          $client->setCreated($date);


          $this
              ->get('client.service')
              ->generateUrl($client);

          $emailSender = $this->getParameter("delivery_address");
          $host = $this->getParameter("host");

          $data = $this
              ->get('email.service')
              ->getData(3, ["TOKEN" => $user->getConfirmationToken(), "HOST"=>$host], $user->getEmail(), $emailSender);


          $ret = [];

          $retEmail = $this
              ->get('sendinblue_api')
              ->send_transactional_template($data);

          if (isset($retEmail['code'])) {
            $ret["email"] = $retEmail['code'];
          }

          $ret['insertUser'] = $this
            ->postAction($client);

          return $ret;

        }

    }


    /**
     * @Get("confirmEmail/{token}")
     */
    public function confirmEmailAction ( $token)
    {

        $user =  $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy(["confirmation_token"=>$token]);

        if ($user) {

            if ($user->getEnabled() === false) {
                $user->setEnabled(true);
            }

            return $this
                ->patchAction($user);

        }

    }

}