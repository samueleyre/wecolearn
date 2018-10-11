<?php

namespace WcBundle\Service;

use Doctrine\ORM\EntityManager;

use AppBundle\Entity\Token;

class TokenService
{

  private $em;

  public function __construct(EntityManager $em)
  {
    $this->em = $em;
  }


  public function setNewToken($user, $type, $deleteOld = false) {

    if ($deleteOld) {

      $token = $this->em
        ->getRepository(Token::class)
        ->findOneBy(["user"=>$user, "type"=> $type]);

      if ($token) {
        $this
          ->remove($token);
      }

    }


    $token = new Token();
    $token->setToken(bin2hex(random_bytes(16)));
    $token->setUser($user);
    $token->setType($type);

    $this
    ->post($token);

    return $token;
  }



  public function post(Token $token ) {

      $this->em->merge( $token );
      $this->em->flush();
      return $this;

    }

    public function remove(Token $token ) {
      $this->em->remove($token);
      $this->em->flush();
      return $this;

    }




}