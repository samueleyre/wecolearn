<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Entity\Token;
use AppBundle\Constant\TokenConstant;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use  FOS\RestBundle\Controller\Annotations\Get;
use  FOS\RestBundle\Controller\Annotations\Post;


class UserController extends Controller
{
  // "options_user" [OPTIONS] /user
  public function optionsUserAction()
  {
    return [];
  }

  /**
   * @Get("/api/user")
   *
   */
  public function getUserAction()
  {

    return $this->get('security.token_storage')->getToken()->getUser();

  }





}