<?php

namespace App\Services\User\Event;

use App\Services\Shared\Service\EmailService;
use App\Services\User\Constant\TokenConstant;
use App\Services\User\Service\TokenService;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ConfirmEmailSubscriber implements EventSubscriberInterface
{

    private $tokenService;
    private $emailService;
    private $container;
    private $host;

    public function __construct(
        EmailService $emailService,
        TokenService $tokenService,
        ContainerInterface $container,
        string $host
    ) {
        $this->tokenService = $tokenService;
        $this->emailService = $emailService;
        $this->container = $container;
        $this->host = $host;
    }

    public static function getSubscribedEvents()
    {
        return [
            UserWasCreated::NAME => 'handle'
        ];
    }

    public function handle( UserWasCreated $event ) {

        $user = $event->getUser();

        $token = $this->tokenService
            ->setNewToken($user, TokenConstant::$types["CONFIRMEMAIL"], true);

        $this->emailService
            ->setData(
                9,
                [
                    "TOKEN" => $token->getToken(),
                    "HOST" => $this->host,
                    "FIRSTNAME" => $user->getFirstName()
                ],
                $user->getEmail()
            )
            ->sendEmail();
    }
}
