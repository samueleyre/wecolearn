<?php

namespace App\Services\User\Event;

use App\Services\User\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class EmailWasChanged extends Event
{

    const NAME = 'Email Was changed';

    private $user;

    public function __construct( User $user )
    {
        $this->user = $user;
    }

    public function getUser() {
        return $this->user;
    }
}
