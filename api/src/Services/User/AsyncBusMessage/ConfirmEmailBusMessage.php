<?php

namespace App\Services\User\AsyncBusMessage;

class ConfirmEmailBusMessage
{

    private float $userId;

    public function __construct(float $userId)
    {
        $this->userId = $userId;
    }

    public function getUserId(): float
    {
        return $this->userId;
    }
}
