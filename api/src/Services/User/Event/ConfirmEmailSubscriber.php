<?php

namespace App\Services\User\Event;

use App\Services\Chat\Service\EmailService;
use App\Services\Domain\Service\DomainService;
use App\Services\User\Constant\TokenConstant;
use App\Services\User\Service\TokenService;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ConfirmEmailSubscriber implements EventSubscriberInterface
{

    private $tokenService;
    private $emailService;
    private $delivery_address;
    private $domainService;
    private $container;

    public function __construct( EmailService $emailService, TokenService $tokenService, DomainService $domainService,ContainerInterface $container, $delivery_address ) {
        $this->tokenService = $tokenService;
        $this->emailService = $emailService;
        $this->delivery_address = $delivery_address;
        $this->domainService = $domainService;
        $this->container = $container;

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
            ->setData(9, ["TOKEN" => $token->getToken(), "HOST" => $this->domainService->getHost(), "FIRSTNAME" => $user->getFirstName()], $user->getEmail(), $this->delivery_address)
            ->sendEmail();
    }
}
