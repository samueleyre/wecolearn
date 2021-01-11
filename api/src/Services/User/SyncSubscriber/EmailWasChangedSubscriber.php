<?php

namespace App\Services\User\SyncSubscriber;

use App\Services\Shared\Service\EmailService;
use App\Services\Domain\Service\DomainService;
use App\Services\User\Constant\TokenConstant;
use App\Services\User\SyncEvent\EmailWasChanged;
use App\Services\User\Service\TokenService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class EmailWasChangedSubscriber implements EventSubscriberInterface
{

    public static function getSubscribedEvents(): array
    {
        return [
            EmailWasChanged::NAME => 'handle'
        ];
    }

    private EntityManagerInterface $em;
    private TokenService $tokenService;
    private EmailService $emailService;
    private string $host;

    public function __construct(EntityManagerInterface $em , TokenService $tokenService, EmailService $emailService, string $host) {
        $this->em = $em;
        $this->tokenService = $tokenService;
        $this->emailService = $emailService;
        $this->host = $host;
    }

    public function handle(EmailWasChanged $event ) {

        $user = $event->getUser();

        $token = $this->tokenService->setNewToken( $event->getUser(), TokenConstant::$types["CONFIRMEMAIL"], true);

        $user->addEmailToken($token);

        $this->emailService
            ->setData(10, [
                "HOST" => $this->host,
                "TOKEN" => $token->getToken(),
                "USERNAME"=>$user->getUsername()],
                $user->getEmail())
            ->sendEmail();

        $this->em->merge($user);
        $this->em->flush();

    }
}
