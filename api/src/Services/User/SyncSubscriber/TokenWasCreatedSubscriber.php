<?php

namespace App\Services\User\SyncSubscriber;

use App\Services\Shared\Service\EmailService;
use App\Services\Domain\Service\DomainService;
use App\Services\User\SyncEvent\TokenWasCreated;
use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class TokenWasCreatedSubscriber implements EventSubscriberInterface
{

    public static function getSubscribedEvents(): array
    {
        return [
            TokenWasCreated::NAME => 'handle'
        ];
    }

    private EmailService $emailService;
    private DomainService $domainService;
    private string $host;

    public function __construct(
        EmailService $emailService,
        DomainService $domainService,
        string $host
    ) {
        $this->emailService = $emailService;
        $this->domainService = $domainService;
        $this->host = $host;
    }

    public function handle(TokenWasCreated $event ) {
        $this->emailService
            ->setData(7, [
                "HOST" => $this->host,
                "TOKEN" => $event->getToken()->getToken(),
                "USERNAME" => $event->getUser()->getUsername()],
                $event->getUser()->getEmail())
            ->sendEmail();
    }
}
