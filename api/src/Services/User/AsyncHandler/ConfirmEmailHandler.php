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
        $this->host = str_contains($host, 'localhost') ? "http://$host" : "https://$host";
    }

    public function __invoke(ConfirmEmailBusMessage $confirmEmailBusMessage)
    {
        $user = $this->em->getRepository(User::class)->find(
            $confirmEmailBusMessage->getUserId()
        );

        $token = $this->tokenService
            ->setNewToken($user, TokenConstant::$types["CONFIRMEMAIL"], true);

        $confirmLink = $this->host."/auth/confirm?token=".$token->getToken();
        $preheader = "Bienvenue sur Wecolearn, " . $user->getFirstName() . " !                                   ";

        $this->emailService
            ->setData(
                22,
                [
                    "HOST" => $this->host,
                    "FIRSTNAME" => $user->getFirstName(),
                    "CONFIRM_LINK" => $confirmLink,
                    "PREHEADER" => $preheader
                ],
                $user->getEmail()
            )
            ->sendEmail();
    }
}
