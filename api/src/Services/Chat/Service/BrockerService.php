<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 29/03/19
 * Time: 14:28
 */

namespace App\Services\Chat\Service;

use App\Services\Chat\Entity\Message;
use App\Services\User\Entity\User;
use JMS\Serializer\SerializerInterface;

class BrockerService
{

//    private $serializer;
//    private $con;

    public function __construct(
//        SerializerInterface $serializer, $rabbitUrl
    )
    {

//        $this->serializer = $serializer;
//        $this->con = new AMQPStreamConnection(
//            parse_url($rabbitUrl, PHP_URL_HOST ),
//            parse_url($rabbitUrl, PHP_URL_PORT ),
//            parse_url($rabbitUrl, PHP_URL_USER ),
//            parse_url($rabbitUrl,PHP_URL_PASS )
//        );
//        $this->channel = $this->con->channel();
//        $this->channel->exchange_declare('message', 'direct', false, false, false );
    }

    public function process(User $to, Message $message)
    {
//        $context = new SerializationContext();
//        $context->setGroups('message');
//        $message = new AMQPMessage($this->serializer->serialize($message, 'json', $context ));
//        $this->channel->basic_publish($message, 'message', "".$to->getId());
    }
}
