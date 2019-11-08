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
use App\_User\DomainModel\Token\TokenConstant;
use App\_User\DomainModel\Token\TokenService;
use App\_User\DomainModel\User\EmailWasChanged;
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
