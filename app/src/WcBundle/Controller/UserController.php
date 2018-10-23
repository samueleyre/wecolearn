<?php

namespace WcBundle\Controller;

use WcBundle\Entity\User;
use WcBundle\Entity\Token;
use WcBundle\Constant\TokenConstant;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use  FOS\RestBundle\Controller\Annotations\Get;
use  FOS\RestBundle\Controller\Annotations\Post;


class UserController extends Controller
{

  /**
   * @Get("user")
   *
   */
  public function getUserAction()
  {
    return $this->get('security.token_storage')->getToken()->getUser();

  }


}