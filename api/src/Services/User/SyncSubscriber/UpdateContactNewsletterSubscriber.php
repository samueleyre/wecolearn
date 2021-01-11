<?php

namespace App\Services\User\SyncSubscriber;

use App\Services\Shared\Service\EmailService;
use App\Services\User\SyncEvent\EmailChangeConfirmed;
use App\Services\User\SyncEvent\NewsletterWasChanged;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UpdateContactNewsletterSubscriber implements EventSubscriberInterface
{

    private EmailService $emailService;
    private string $environment;

    public function __construct(
        EmailService $emailService,
        string $environment
    )
    {
        $this->emailService = $emailService;
        $this->environment = $environment;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            EmailChangeConfirmed::NAME => 'onEmailChange',
            NewsletterWasChanged::NAME => 'onNewsletterChange'
        ];
    }

    public function onEmailChange(EmailChangeConfirmed $event)
    {
        if($this->environment !== 'prod') {
            return;
        }
        $user = $event->getUser();
        $this->emailService->updateContact($user->getOldEmail(), $user->getEmail());
    }

    public function onNewsletterChange(NewsletterWasChanged $event)
    {
        if($this->environment !== 'prod') {
            return;
        }

        $user = $event->getUser();
        $shouldBeBlacklisted = !$user->getNewsletter();
        if ($user->emailConfirmed) {
            // usual case
            $this->emailService->updateContact($user->getEmail(), null, $shouldBeBlacklisted);
        } else if (!$user->emailConfirmed && $user->getOldEmail()) {
            // email has been changed but not confirmed
            $this->emailService->updateContact($user->getOldEmail(), null, $shouldBeBlacklisted);
        } else if (!$user->emailConfirmed && !$user->getOldEmail()) {
            // account has been recently created and email not confirmed
            $this->emailService->updateContact($user->getEmail(), null, $shouldBeBlacklisted);
        }
    }
}
