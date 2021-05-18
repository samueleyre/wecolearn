<?php


namespace App\Services\User\AsyncHandler;

use App\Services\Chat\Service\NotificationService;
use App\Services\Shared\Service\EmailService;
use App\Services\Tag\Constant\TagConstant;
use App\Services\Tag\Entity\Tag;
use App\Services\Tag\Entity\TagDomain;
use App\Services\User\AsyncBusMessage\NotifyUserCommunityInviteBusMessage;
use App\Services\User\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use App\Services\Core\Constant\FrontNavConstant;

class NotifyUserCommunityInviteHandler implements MessageHandlerInterface
{

    private EmailService $emailService;
    private NotificationService $notificationService;
    private ContainerInterface $container;
    private string $host;
    private EntityManagerInterface $em;

    public function __construct(
        EntityManagerInterface $em,
        EmailService $emailService,
        NotificationService $notificationService,
        ContainerInterface $container,
        string $host
    )
    {
        $this->em = $em;
        $this->emailService = $emailService;
        $this->notificationService = $notificationService;
        $this->container = $container;
        $this->host = str_contains($host, 'localhost') ? "http://$host" : "https://$host";
    }

    public function __invoke(NotifyUserCommunityInviteBusMessage $notifyUserMatchBusMessage)
    {


//        WIP
//        $user = $this->em->getRepository(User::class)->find(
//            $notifyUserMatchBusMessage->getUserId()
//        );
//
//
////         nom de la communauté
////         la communauté !
//
//        $CommunityLink = $this->host . '/' . FrontNavConstant::$Nav['publicProfile'] . '/' . $user->getProfilUrl();
//        $linkToSettings = $this->host . '/' . FrontNavConstant::$Nav['settings'];
//        $preheader = $matchingUser->getFirstName() . ' est aussi intéressé·e par cet apprentissage : ' . $commonTags[0] .'                ';
//
//        $this->emailService
//            ->setData(
//                21,
//                [
//                    "HOST" => $this->host,
//                    "FIRSTNAME" => $matchingUser->getFirstName(),
//                    "PARAMETERS_LINK" => $linkToSettings,
//                    "PREHEADER" => $preheader,
//                    "TAGS" => $commonTags,
//                ],
//                $matchingUser->getEmail()
//            )
//            ->sendEmail();

    }
}
