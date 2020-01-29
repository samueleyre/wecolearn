<?php

namespace App\Services\User\Event;

use App\Services\Chat\Service\EmailService;
use App\Services\Domain\Service\DomainService;
use Psr\Log\LoggerInterface;
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
    private $logger;

    public function __construct(EmailService $emailService, DomainService $domainService, LoggerInterface $logger ) {
        $this->emailService = $emailService;
        $this->domainService = $domainService;
        $this->logger = $logger;
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
