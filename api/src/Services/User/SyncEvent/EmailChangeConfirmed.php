<?php

namespace App\Services\User\SyncEvent;

use App\Services\User\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class EmailChangeConfirmed extends Event
{

    const NAME = 'Email changed is confirmed';

    private $user;

    public function __construct( User $user )
    {
        $this->user = $user;
    }

    public function getUser() {
        return $this->user;
    }
}
