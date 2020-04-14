<?php


namespace App\Services\Chat\Service;

use App\Services\Chat\Entity\Message;
use App\Services\User\Entity\User;
use JMS\Serializer\SerializerInterface;
use Kreait\Firebase\Messaging;
use Kreait\Firebase\Messaging\CloudMessage;
use Symfony\Component\HttpFoundation\Request;


class NotificationService
{

    private $sender;
    private $serializer;

    public function __construct(Messaging $sender, MessageSerializer $serializer ) {
        $this->sender = $sender;
        $this->serializer = $serializer;
    }


    public function process( User $to, Message $message, Request $request  ) {

        $deviceToken = null;

        $notification = CloudMessage::withTarget('token', $deviceToken );

        $config = Messaging\AndroidConfig::fromArray([
            'ttl' => '3600s',
            'priority' => 'normal',
            'notification' => [
                'title' => 'Mesenger message',
                'body' => $this->serializer->getPayload($message, $request ),
                'icon' => 'stock_ticker_update',
                'color' => '#f45342',
            ],
        ]);
        $notification = $notification->withAndroidConfig( $config );
        $this->sender->send( $notification );
   }
}