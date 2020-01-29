<?php

namespace App\Services\User\Event;

use App\Services\Chat\Service\EmailService;
use App\Services\Domain\Service\DomainService;
use App\Services\User\Constant\TokenConstant;
use App\Services\User\Event\EmailWasChanged;
use App\Services\User\Service\TokenService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class EmailWasChangedSubscriber implements EventSubscriberInterface
{

    public static function getSubscribedEvents()
    {
        return [
            EmailWasChanged::NAME => 'handle'
        ];
    }

    private $em;
    private $tokenService;
    private $emailService;
    private $domainService;

    public function __construct(EntityManagerInterface $em , TokenService $tokenService, EmailService $emailService , DomainService $domainService ) {
        $this->em = $em;
        $this->tokenService = $tokenService;
        $this->emailService = $emailService;
        $this->domainService = $domainService;
    }

    public function handle(EmailWasChanged $event ) {

        $user = $event->getUser();

        $token = $this->tokenService->setNewToken( $event->getUser(), TokenConstant::$types["CONFIRMEMAIL"], true);

        $user->addEmailToken($token);

        $this->emailService
            ->setData(6, [
                "HOST"=>$this->domainService->getHost(),
                "TOKEN" => $token->getToken(),
                "USERNAME"=>$user->getUsername()],
                $user->getEmail())
            ->sendEmail();

        $this->em->merge($user);
        $this->em->flush();

    }
}
