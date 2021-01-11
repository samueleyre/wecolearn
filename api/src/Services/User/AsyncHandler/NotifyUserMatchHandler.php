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
        $this->host = $host;
    }

    public function __invoke(NotifyUserMatchBusMessage $notifyUserMatchBusMessage)
    {

        $user = $notifyUserMatchBusMessage->getUser();

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
                    $this->sendEmail($matchingUser, $user, $commonTags);
                }
            } else if ($matchingUser->getNewMatchEmail()) {
                $this->sendEmail($matchingUser, $user, $commonTags);
            }

        }
    }

    private function sendEmail(User $matchingUser, User $user, ArrayCollection $commonTags)
    {
        $this->emailService
            ->setData(
                15,
                [
                    "HOST" => $this->host,
                    "FIRSTNAME" => $matchingUser->getFirstName(),
                    "MATCH_FIRSTNAME" => $user->getFirstName(),
                    "MATCH_PROFIL_URL" => $user->getProfilUrl(),
                    "TAGS" => array_values($commonTags->toArray()), // reindex array with array_values
                ],
                $matchingUser->getEmail()
            )
            ->sendEmail();
    }
}
