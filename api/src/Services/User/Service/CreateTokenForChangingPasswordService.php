<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 17/03/19
 * Time: 12:37
 */

namespace App\Services\User\Service;

use App\Services\User\Constant\TokenConstant;
use App\Services\User\Entity\User;
use App\Services\User\Event\TokenWasCreated;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CreateTokenForChangingPasswordService
{

    private $tokenService;
    private $em;
    private $dispatcher;


    public function __construct(
        TokenService $tokenService,
        EntityManagerInterface $em,
        EventDispatcherInterface $dispatcher
    ) {
        $this->tokenService = $tokenService;
        $this->em = $em;
        $this->dispatcher = $dispatcher;
    }

    public function process(string $email)
    {

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

            $this->dispatcher->dispatch(new TokenWasCreated($user, $token), TokenWasCreated::NAME);

            return $token;
        } else {
            return null;
        }
    }
}
