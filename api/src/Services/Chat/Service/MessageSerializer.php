<?php


namespace App\Services\Chat\Service;


use App\Services\Chat\Entity\Message;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;

class MessageSerializer
{

    public function __construct( SerializerInterface $serializer ) {
        $this->serializer = $serializer;
    }

    public function getPayload( Message $message , Request $request ) {
        $ret = $this->serializer->serialize(
            $message,
            'json',
            SerializationContext::create()->setGroups(['message'])
        );
        syslog( LOG_ERR, $ret );
        return $ret;
    }
}
