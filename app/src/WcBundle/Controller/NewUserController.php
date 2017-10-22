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
    public function postNewUserAction( User $user, Request $request )
    {

        $userManager = $this->get('fos_user.user_manager');


        $user->setRoles(['ROLE_USER']);
//        $user->addRole('ROLE_ADMIN');
        // password.
        $user->setPlainPassword( $user->getPassword() );
        $user->setPassword(null);

        //should be in configuration.
        $user->setEnabled(true);

        try {
            $userManager->updateUser( $user );

        }
        catch (NotNullConstraintViolationException $e) {
            // Found the name of missed field
            return "notnull";
        }
        catch (UniqueConstraintViolationException $e) {
            // Found the name of duplicate field
            return "duplicate";
        }
        catch ( \Exception $e ) {

            //for debugging you can do like this
            return "error";

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


            $this
                ->postAction( $client);

        }

        return true;


    }



    



}
