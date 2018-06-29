<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller
{
  // "options_user" [OPTIONS] /user
  public function optionsUserAction()
  {
    return [];
  }

  // "get_user"     [GET] /user
  public function getUserAction()
  {

    return $this->get('security.token_storage')->getToken()->getUser();

  }



}