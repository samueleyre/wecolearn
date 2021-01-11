<?php

namespace App\Services\User\AsyncBusMessage;

use App\Services\User\Entity\User;

class NotifyUserMatchBusMessage
{

    private User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
