<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 17/03/19
 * Time: 12:37
 */

namespace App\_User\DomainModel\User;


use App\_User\DomainModel\Token\TokenConstant;
use App\_User\DomainModel\Token\TokenService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CreateTokenForChangingPasswordService
{

    private $userRepository;
    private $tokenService;
    private $em;
    private $dispatcher;


    public function __construct(TokenService $tokenService, EntityManagerInterface $em, EventDispatcherInterface $dispatcher ) {
        $this->tokenService = $tokenService;
        $this->em = $em;
        $this->dispatcher = $dispatcher;


    }

    public function process( string $email )
    {

        $ret = [];

        $user = $this->em->getRepository(User::class)
            ->findOneBy(["email" => $email]);

        if ($user) {

            $token = $this->tokenService->setNewToken($user, TokenConstant::$types["CONFIRMEMAILPASSWORD"], true);

            $user->addEmailToken($token);

            //$userService
            //    ->patch($user, $user->getId());

            $this->em->merge($user);
            $this->em->flush();

            $this->tokenService->post($token);

            $this->dispatcher->dispatch( TokenWasCreated::NAME, new TokenWasCreated($user, $token));

            return $token;

        } else {

            return null;

        }
    }
}
