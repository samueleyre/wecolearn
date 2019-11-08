<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 28/03/19
 * Time: 09:50
 */

namespace App\_Application\Infrastructure\Notification\PushMessage;


use App\_Chat\DomainModel\Message\Message;
use App\_User\DomainModel\User\User;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Minishlink\WebPush\Subscription;
use Minishlink\WebPush\WebPush;
use Symfony\Component\HttpFoundation\Request;
use App\_User\DomainModel\NotificationSubscription\Subscription as SubscriptionModel;

class Sender
{

    private $em;
    private $serializer;
    private $vapidPublic;
    private $vapidPrivate;

    public function __construct(EntityManagerInterface $em, SerializerInterface $serializer , $vapidPublic, $vapidPrivate ) {
        $this->em = $em;
        $this->serializer = $serializer;
        $this->vapidPrivate = $vapidPrivate;
        $this->vapidPublic = $vapidPublic;
    }

    public function process(User $to, Message $message , Request $request ) {
        $auth = [
            'VAPID' => [
                'subject' => 'mailto:contact@wwecolearn.com', // can be a mailto: or your website address
                'publicKey' => $this->vapidPublic, // (recommended) uncompressed public key P-256 encoded in Base64-URL
                'privateKey' => $this->vapidPrivate, // (recommended) in fact the secret multiplier of the private key encoded in Base64-URL
            ],
        ];
        $webPush = new WebPush($auth);
        foreach ($subs = $this->getSubscriptions($to, $message, $request ) as $notification) {
            $webPush->sendNotification(
                $notification['subscription'],
                $notification['payload']
            );
        }
        if( count( $subs ) === 0 ) {
            return false;
        }
        foreach ($webPush->flush() as $report) {

            $endpoint = $report->getRequest()->getUri()->__toString();

            if ($report->isSuccess()) {

                //echo "[v] Message sent successfully for subscription {$endpoint}.";

            } else {

                syslog(LOG_ERR, "[x] Message failed to sent for subscription {$endpoint}: {$report->getReason()}");
            }
        }
        return true;
    }

    private function getSubscriptions( $receiver, $message , Request $request ) {

        $subscriptions = $this->em->getRepository(SubscriptionModel::class )->findByUser( $receiver );
        $ret = [];

        $context = new SerializationContext();
        $context->setGroups(['message']);

        $host = $request->headers->get('origin');
        $payload = $this->serializer->serialize( ['message' => $message, 'host' =>  $host ], 'json', $context );

        foreach( $subscriptions as $sub ) {
            $ret[]  = [
                'subscription' => Subscription::create([ // this is the structure for the working draft from october 2018 (https://www.w3.org/TR/2018/WD-push-api-20181026/)
                    "endpoint" => $sub->getEndpoint(),
                    "keys" => [
                        'p256dh' => $sub->getP256dh(),
                        'auth' => $sub->getAuth(),
                    ],
                ]),
                'payload' => $payload,
            ];
        }
        return $ret;
    }
}
