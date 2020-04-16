<?php


namespace App\Services\Chat\Service;


use App\Services\Chat\Entity\Message;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;

class MessageSerializer
{

    public function __construct( SerializerInterface $serializer ) {
        $this->serializer = $serializer;
    }

    public function getPayload( Message $message , Request $request ) {
        $host = $request->headers->get('origin');
        return $this->serializer->serialize(
            $message,
            'json'
        );
    }
}
