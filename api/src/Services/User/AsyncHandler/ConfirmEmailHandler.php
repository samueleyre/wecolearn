<?php


namespace App\Services\User\AsyncHandler;

use App\Services\Shared\Service\EmailService;
use App\Services\User\AsyncBusMessage\ConfirmEmailBusMessage;
use App\Services\User\Constant\TokenConstant;
use App\Services\User\Service\TokenService;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

class ConfirmEmailHandler implements MessageHandlerInterface
{

    private TokenService $tokenService;
    private EmailService $emailService;
    private ContainerInterface $container;
    private string $host;

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

    public function __invoke(ConfirmEmailBusMessage $confirmEmailBusMessage)
    {
        $user = $confirmEmailBusMessage->getUser();

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
