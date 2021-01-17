<?php

namespace App\Services\User\SyncSubscriber;

use App\Services\Shared\Service\EmailService;
use App\Services\Chat\Service\NotificationService;
use App\Services\Tag\Constant\TagConstant;
use App\Services\Tag\Entity\Tag;
use App\Services\User\AsyncBusMessage\NotifyUserMatchBusMessage;
use App\Services\User\Entity\User;
use App\Services\User\SyncEvent\UserWasCreated;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Messenger\MessageBusInterface;

class NotifyNewUserMatchSubscriber implements EventSubscriberInterface
{

    private MessageBusInterface $messageBusInterface;

    public function __construct(
        MessageBusInterface $messageBusInterface
    ) {
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
        $this->messageBusInterface->dispatch(new NotifyUserMatchBusMessage($event->getUser()->getId()));;
    }
}
