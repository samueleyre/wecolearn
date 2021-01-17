<?php


namespace App\Services\User\AsyncHandler;

use App\Services\Shared\Service\EmailService;
use App\Services\User\AsyncBusMessage\ConfirmEmailBusMessage;
use App\Services\User\Constant\TokenConstant;
use App\Services\User\Entity\User;
use App\Services\User\Service\TokenService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

class ConfirmEmailHandler implements MessageHandlerInterface
{

    private TokenService $tokenService;
    private EmailService $emailService;
    private ContainerInterface $container;
    private string $host;
    private EntityManagerInterface $em;

    public function __construct(
        EntityManagerInterface $em,
        EmailService $emailService,
        TokenService $tokenService,
        ContainerInterface $container,
        string $host
    ) {
        $this->em = $em;
        $this->tokenService = $tokenService;
        $this->emailService = $emailService;
        $this->container = $container;
        $this->host = $host;
    }

    public function __invoke(ConfirmEmailBusMessage $confirmEmailBusMessage)
    {
        $user = $this->em->getRepository(User::class)->find(
            $confirmEmailBusMessage->getUserId()
        );

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
