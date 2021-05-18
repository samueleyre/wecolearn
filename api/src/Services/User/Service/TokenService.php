<?php

namespace App\Services\User\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Services\Shared\Entity\Token;

class TokenService
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }


    public function setNewToken($user, $type, $deleteOld = false)
    {
        if ($deleteOld) {
            $oldToken = $this->em
        ->getRepository(Token::class)
        ->findOneBy(["user"=>$user, "type"=> $type]);

            if ($oldToken) {
                $this->remove($oldToken);
            }
        }


        $token = new Token();
        $token->setToken(bin2hex(random_bytes(16)));
        $token->setUser($user);
        $token->setType($type);

        $this->post($token);

        return $token;
    }

    public function createNewToken($type, $user = null, $domain = null): Token
    {
        $token = new Token();
        $token->setToken(bin2hex(random_bytes(16)));
        $token->setType($type);

//        for domain related tokens
        if ($domain) {
            $token->setDomain();
        }

//        for user related tokens
        if ($user) {
            $token->setUser($user);
        }

        $this->post($token);

        return $token;
    }

    public function patch(Token $token): TokenService
    {
        $this->em->persist($token);
        $this->em->flush();
        return $this;
    }

    public function post(Token $token): TokenService
    {
        $this->em->persist($token);
        $this->em->flush();
        return $this;
    }

    public function remove(Token $token): TokenService
    {
        $this->em->remove($token);
        $this->em->flush();
        return $this;
    }
}
