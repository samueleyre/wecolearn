<?php

namespace App\Services\User\Event;

use App\Services\Shared\Service\EmailService;
use App\Services\Chat\Service\NotificationService;
use App\Services\Tag\Constant\TagConstant;
use App\Services\User\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class AddContactNewsletterSubscriber implements EventSubscriberInterface
{

    private $emailService;
    private $environment;

    public function __construct(
        EmailService $emailService,
        string $environment
    )
    {
        $this->emailService = $emailService;
        $this->environment = $environment;
    }

    public static function getSubscribedEvents()
    {
        return [
            UserWasCreated::NAME => 'handle'
        ];
    }

    public function handle(UserWasCreated $event)
    {
        if($this->environment !== 'prod') {
            return;
        }
        $user = $event->getUser();
        $shouldBeBlacklisted = !$user->getNewsletter();
        $this->emailService->addContact($user->getEmail(), $shouldBeBlacklisted);
    }
}
