<?php


namespace App\Services\User\AsyncHandler;

use App\Services\Chat\Service\NotificationService;
use App\Services\Shared\Service\EmailService;
use App\Services\Tag\Constant\TagConstant;
use App\Services\User\AsyncBusMessage\NotifyUserMatchBusMessage;
use App\Services\User\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use App\Services\Core\Constant\FrontNavConstant;

class NotifyUserMatchHandler implements MessageHandlerInterface
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

    public function __invoke(NotifyUserMatchBusMessage $notifyUserMatchBusMessage)
    {

        $user = $this->em->getRepository(User::class)->find(
            $notifyUserMatchBusMessage->getUserId()
        );

        $matchingUsers = $this->em
            ->getRepository(User::class)
            ->search(
                [
                    'user' => $user,
                    'distance' => 15,
                    'parameters' => [
                        'userLearnTags' => true,
                        'userKnowTags' => false,
                        'userLearnTagDomains' => false,
                        'userKnowTagDomains' => false,
                        'searchLearnTag' => false,
                        'orderByDistance' => false,
                    ],
                ]
            );

        $matchingUsers = array_map(function ($res) {
            return $res[0];
        }, $matchingUsers);

        foreach ($matchingUsers as $matchingUser) {

            if (!$matchingUser->getNewMatchNotification() && !$matchingUser->getNewMatchEmail()) {
                continue;
            }

            $commonTags = $matchingUser->getTags()->filter(function ($tag) use ($user) {
                $userHasTag = $user->getTags()->filter(function ($userTag) use ($tag) {
                    return $userTag->getId() === $tag->getId() && $tag->getType() === TagConstant::$types['LEARNING'];
                });
                return count($userHasTag) > 0;
            })->map(function ($tag) {
                return $tag->getName();
            })->toArray();

            if ($matchingUser->getNewMatchNotification()) {
                try {
                    $this->notificationService->processNewMatchingProfil($matchingUser, $user);
                } catch (\Exception | \Error $e) {
                    if ($matchingUser->getNewMatchEmail()) {
                        $this->sendEmail($matchingUser, $user, $commonTags);
                    }
                }
            } else if ($matchingUser->getNewMatchEmail()) {
                $this->sendEmail($matchingUser, $user, $commonTags);
            }

        }
    }

    private function sendEmail(User $matchingUser, User $user, array $commonTags)
    {

        $MatchPublicProfilLink = $this->host . '/' . FrontNavConstant::$Nav['publicProfile'] . '/' . $user->getProfilUrl();
        $linkToSettings = $this->host . '/' . FrontNavConstant::$Nav['settings'];
        $preheader = $matchingUser->getFirstName() . ' est aussi intéressé·e par cet apprentissage : ' . $commonTags[0] .'                ';

        $this->emailService
            ->setData(
                21,
                [
                    "HOST" => $this->host,
                    "FIRSTNAME" => $matchingUser->getFirstName(),
                    "MATCH_FIRSTNAME" => $user->getFirstName(),
                    "MATCH_PROFIL_LINK" => $MatchPublicProfilLink,
                    "PARAMETERS_LINK" => $linkToSettings,
                    "PREHEADER" => $preheader,
                    "TAGS" => $commonTags,
                ],
                $matchingUser->getEmail()
            )
            ->sendEmail();
    }
}
