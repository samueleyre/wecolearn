<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 15/03/19
 * Time: 10:27
 */

namespace App\_User\DomainModel\Notification;


use App\_Application\Domain\DomainService;
use App\_Application\DomainEvent;
use App\_Application\DomainSubscriber;
use App\_User\DomainModel\User\UserWasCreated;
use App\_User\DomainModel\Token\TokenConstant;
use App\_Application\Infrastructure\Notification\Email\EmailService;
use App\_User\DomainModel\Token\TokenService;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ConfirmEmailSubscriber implements EventSubscriberInterface
{

    private $tokenService;
    private $emailService;
    private $delivery_address;
    private $domainService;
    private $container;

    public function __construct( EmailService $emailService, TokenService $tokenService,  DomainService $domainService,ContainerInterface $container, $delivery_address ) {
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

        if( 'prod' === $this->container->getParameter("environment") ) {
            $this->emailService
                ->setData(3, ["TOKEN" => $token->getToken(), "HOST" => $this->domainService->getHost(), "USERNAME" => $user->getUsername()], $user->getEmail(), $this->delivery_address)
                ->sendEmail();
        }
    }
}
