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
                    'title' => 'Wecolearn',
                    'body' => 'Vous avez un message',
                    'icon' => 'ic_stat_icon',
                    'color' => '#f7eb43',
                    'sound' => 'default',

                ],
                'data'  => ['message' => $this->serializer->getPayload($message, $request)]
            ]);
            $notification = $notification->withAndroidConfig($config);

            try {
                $this->sender->send($notification);
            }
            catch (\Error $e) {
                syslog(LOG_ERR, `could not send notif of message via firebase to android to ${$to->getId()}`);
            }
            catch (\Exception $e) {
                syslog(LOG_ERR, `could not send notif of message via firebase to android to ${$to->getId()}`);
            }
        }
    }
}
