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
use App\Services\User\SyncEvent\TokenWasCreated;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CreateTokenForChangingPasswordService
{

    private $tokenService;
    private $em;
    private $dispatcher;
    private $logger;


    public function __construct(
        TokenService $tokenService,
        EntityManagerInterface $em,
        EventDispatcherInterface $dispatcher,
        LoggerInterface $logger
    ) {
        $this->tokenService = $tokenService;
        $this->em = $em;
        $this->dispatcher = $dispatcher;
        $this->logger = $logger;
    }

    public function process(string $email)
    {

        $this->logger->debug('email', [$email]);

        $user = $this->em->getRepository(User::class)
            ->findOneBy(["email" => $email]);

        $this->logger->debug('user', [$user]);

        if ($user) {
            $token = $this->tokenService->setNewToken($user, TokenConstant::$types["CONFIRMEMAILPASSWORD"], true);

            $this->logger->debug('token', [$token]);


            $user->addEmailToken($token);

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
