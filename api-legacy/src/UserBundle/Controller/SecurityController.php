<?php


Namespace App\UserBundle\Controller;

use FOS\UserBundle\Controller\SecurityController as FOSController;



class SecurityController extends FOSController {
public function loginAction(\Symfony\Component\HttpFoundation\Request $request){
  $response = parent::loginAction($request);

  $user = $this->get('security.token_storage')->getToken()->getUser();
  $user->setLastConnexion(new \DateTime("now", new \DateTimeZone('Europe/Paris')));
  $this->get('fos_user.user_manager')->updateUser($user);

  return $response;
}
}
