<?php

namespace App\Services\User\SyncEvent;

use App\Services\User\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class UserWasCreated extends Event
{

    const NAME = 'User was created';

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
