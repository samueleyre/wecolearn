<?php


namespace App\Services\Chat\Service;

use App\Services\Chat\Entity\Message;
use App\Services\User\Entity\PushNotificationSubscription;
use App\Services\User\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerInterface;
use Kreait\Firebase\Messaging;
use Kreait\Firebase\Messaging\CloudMessage;
use Symfony\Component\HttpFoundation\Request;


class NotificationService
{

    private $sender;
    private $serializer;
    private $em;

    public function __construct(Messaging $sender, MessageSerializer $serializer , EntityManagerInterface $em ) {
        $this->sender = $sender;
        $this->serializer = $serializer;
        $this->em = $em;
    }


    public function process( User $to, Message $message, Request $request  ) {

        $deviceToken = null;

        $subscriptions = $this->em->getRepository(PushNotificationSubscription::class)->findByUser( $to );

        foreach( $subscriptions as $sub ) {

            $deviceToken = $sub->getToken();

            $notification = CloudMessage::withTarget('token', $deviceToken);

            $config = Messaging\AndroidConfig::fromArray([
                'ttl' => '3600s',
                'priority' => 'normal',
                'notification' => [
                    'title' => 'Mesenger message',
                    'body' => $this->serializer->getPayload($message, $request),
                    'icon' => 'stock_ticker_update',
                    'color' => '#f45342',
                ],
            ]);
            $notification = $notification->withAndroidConfig($config);
            $this->sender->send($notification);
        }
    }
}