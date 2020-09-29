<?php


namespace App\Services\Chat\Service;


use App\Services\Chat\Entity\Message;
use App\Services\User\Entity\User;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;

class MessageSerializer
{

    public function __construct( SerializerInterface $serializer ) {
        $this->serializer = $serializer;
    }

    public function getMessagePayload(Message $message ) {
        $ret = $this->serializer->serialize(
            $message,
            'json',
            SerializationContext::create()->setGroups(['message'])
        );
        syslog( LOG_ERR, $ret );
        return $ret;
    }

    public function getMatchPayload(User $match) {
        $ret = $this->serializer->serialize(
            $match,
            'json',
            SerializationContext::create()->setGroups(['user'])
        );
        syslog( LOG_ERR, $ret );
        return $ret;
    }
}
