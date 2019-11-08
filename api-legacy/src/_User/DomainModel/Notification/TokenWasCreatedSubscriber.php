<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 17/03/19
 * Time: 12:55
 */

namespace App\_User\DomainModel\Notification;


use App\_Application\Domain\DomainService;
use App\_Application\Infrastructure\Notification\Email\EmailService;
use App\_User\DomainModel\User\TokenWasCreated;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class TokenWasCreatedSubscriber implements EventSubscriberInterface
{

    public static function getSubscribedEvents()
    {
        return [
            TokenWasCreated::NAME => 'handle'
        ];
    }

    private $emailService;
    private $domainService;

    public function __construct(EmailService $emailService, DomainService $domainService ) {
        $this->emailService = $emailService;
        $this->domainService = $domainService;
    }

    public function handle(TokenWasCreated $event ) {

        $this->emailService
            ->setData(7, [
                "HOST" => $this->domainService->getHost(),
                "TOKEN" => $event->getToken()->getToken(),
                "USERNAME" => $event->getUser()->getUsername()],
                $event->getUser()->getEmail())
            ->sendEmail();
    }
}
