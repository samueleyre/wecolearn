<?php

namespace App\Services\User\SyncSubscriber;

use App\Services\User\AsyncBusMessage\ConfirmEmailBusMessage;
use App\Services\User\SyncEvent\UserWasCreated;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Messenger\MessageBusInterface;

class ConfirmEmailSubscriber implements EventSubscriberInterface
{

    private MessageBusInterface $messageBusInterface;

    public function __construct(
        MessageBusInterface $messageBusInterface
    )
    {
        $this->messageBusInterface = $messageBusInterface;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            UserWasCreated::NAME => 'handle'
        ];
    }

    public function handle(UserWasCreated $event)
    {
        $this->messageBusInterface->dispatch(new ConfirmEmailBusMessage($event->getUser()->getId()));
    }
}
