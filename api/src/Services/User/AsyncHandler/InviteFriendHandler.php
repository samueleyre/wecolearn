<?php


namespace App\Services\User\AsyncHandler;

use App\Services\Shared\Service\EmailService;
use App\Services\User\AsyncBusMessage\InviteFriendBusMessage;
use App\Services\User\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

class InviteFriendHandler implements MessageHandlerInterface
{

    private EmailService $emailService;
    private EntityManagerInterface $em;
    private string $host;

    public function __construct(
        EntityManagerInterface $em,
        EmailService $emailService,
        string $host
    )
    {
        $this->em = $em;
        $this->emailService = $emailService;
        $this->host = str_contains($host, 'localhost') ? "http://$host" : "https://$host";
    }

    public function __invoke(InviteFriendBusMessage $inviteFriendBusMessage)
    {
        $user = $this->em->getRepository(User::class)->find(
            $inviteFriendBusMessage->getUserId()
        );
        $learnTags = $user->getTags(0);
        $tagNames = $learnTags->map(function ($tag) {
            return $tag->getName();
        })->toArray();
        $tagsString = "";
        foreach ($tagNames as $i => $tagName) {
            $tagsString .= $tagName.($i === (count($tagNames) - 1) ? '' : ',');
        }

        $tagIds = $learnTags->map(function ($tag) {
            return $tag->getId();
        })->toArray();

        $tagsUri = "";
        if (count($tagIds) > 0) {
            $tagsUri .= "?tag_id=".$tagIds[0]."&tag_name=".$tagNames[0];
        }
        $createAccountLink = $this->host . "/auth/subscribe" . $tagsUri;
        $preheader = "Rejoignez une communauté d'apprenants !";

        $this->emailService
            ->setData(
                26,
                [
                    "HOST" => $this->host,
                    "FIRSTNAME" => $user->getFirstName(),
                    "CREATE_ACCOUNT_LINK" => $createAccountLink,
                    "PREHEADER" => $preheader,
                    "TAGS" => $tagNames,
                    "TAGS_STRING" => $tagsString,

                ],
                $user->getEmail()
            )
            ->sendEmail();
    }
}
