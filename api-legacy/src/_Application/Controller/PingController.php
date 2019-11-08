<?php

namespace App\_Application\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


class PingController extends Controller
{

    /**
    * @Get("ping" )
    */
    public function getAction(Request $request, TokenStorageInterface $tokenStorage )
    {
      $user = $tokenStorage->getToken()->getUser();
      $user->setLastConnexion(new \DateTime("now", new \DateTimeZone('Europe/Paris')));
      $this->get('fos_user.user_manager')->updateUser($user);
      return ['userId' => $user->getId()];

    }



}
