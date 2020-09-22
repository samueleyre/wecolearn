<?php

namespace App\Services\User\Event;

use App\Services\Chat\Service\EmailService;
use App\Services\Chat\Service\NotificationService;
use App\Services\Tag\Constant\TagConstant;
use App\Services\User\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class NotifyNewUserMatchSubscriber implements EventSubscriberInterface
{

    private $emailService;
    private $notificationService;
    private $container;
    private $host;
    private $em;

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

    public static function getSubscribedEvents()
    {
        return [
            UserWasCreated::NAME => 'handle'
        ];
    }

    public function handle(UserWasCreated $event)
    {

        $user = $event->getUser();

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

            if($matchingUser->getNewMatchNotification()) {
                $this->notificationService->processNewMatchingProfil($matchingUser, $user );
            }

            else if ($matchingUser->getNewMatchEmail()) {
                $this->emailService
                    ->setData(
                        15,
                        [
                            "HOST" => $this->host,
                            "FIRSTNAME" => $matchingUser->getFirstName(),
                            "MATCH_FIRSTNAME" => $user->getFirstName(),
                            "MATCH_PROFIL_URL" => $user->getProfilUrl(),
                            "TAGS" => array_values($commonTags), // reindex array with array_values
                        ],
                        $matchingUser->getEmail()
                    )
                    ->sendEmail();
            }

        }

    }
}
