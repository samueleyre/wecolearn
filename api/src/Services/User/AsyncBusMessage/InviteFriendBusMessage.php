<?php

namespace App\Services\User\AsyncBusMessage;

class InviteFriendBusMessage
{

    private float $userId;
    private string $email;

    public function __construct(float $userId, string $email)
    {
        $this->userId = $userId;
        $this->email = $email;
    }

    public function getUserId(): float
    {
        return $this->userId;
    }

    public function getEmail(): string
    {
        return $this->email;
    }
}
