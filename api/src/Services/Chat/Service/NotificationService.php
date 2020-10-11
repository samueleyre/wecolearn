<?php


namespace App\Services\Chat\Service;

use App\Services\Chat\Entity\Message;
use App\Services\User\Entity\PushNotificationSubscription;
use App\Services\User\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Kreait\Firebase\Messaging;
use Kreait\Firebase\Messaging\CloudMessage;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;


class NotificationService
{

    private $sender;
    private $serializer;
    private $em;

    public function __construct(
        Messaging $sender,
        MessageSerializer $serializer ,
        EntityManagerInterface $em
    ) {
        $this->sender = $sender;
        $this->serializer = $serializer;
        $this->em = $em;
    }


    public function processNewMatchingProfil(User $to, User $match) {
        $this->processNotification(
            $to,
            ['user' => $this->serializer->getMatchPayload($match)],
            'Wecolearn',
            'Nouveau profil !'
        );
    }

    public function processMessage(User $to, Message $message ) {
        $this->processNotification(
            $to,
            ['message' => $this->serializer->getMessagePayload($message)],
            'Wecolearn',
            'Vous avez un message'
        );
    }

    public function processIsRead(User $to, Message $message ) {
        $this->processNotification(
            $to,
            ['is_read' => $this->serializer->getMessagePayload($message)]
        );
    }


    public function processNotification(User $to, $data, $title = null, $body = null) {

        $configData = [
            'ttl' => '3600s',
            'priority' => 'normal',
            'data'  => $data
        ];

        if ($title) {
            // notification displayed on screen
            $configData['notification'] = [
                'title' => $title,
                'body' => $body,
                'icon' => 'ic_stat_icon',
                'color' => '#f7eb43',
                'sound' => 'default',

            ];
        }

        $config = Messaging\AndroidConfig::fromArray($configData);

        $subscriptions = $this->em->getRepository(PushNotificationSubscription::class)->findByUser( $to );

        foreach( $subscriptions as $sub ) {

            $notification = CloudMessage::withTarget('token', $sub->getToken());
            $notification = $notification->withAndroidConfig($config);

            try {
                $this->sender->send($notification);
            }

            catch (\Error $e) {
                syslog(LOG_ERR, "could not send notif via firebase to android : $e");
            }

            catch (\Exception $e) {
                syslog(LOG_ERR, "could not send notif via firebase to android : $e");
            }

        }
    }
}
