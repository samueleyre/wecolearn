<?php

namespace App\Services\User\Event;

use App\Services\User\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class NewsletterWasChanged extends Event
{

    const NAME = 'Newsletter parameter was changed';

    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function getUser()
    {
        return $this->user;
    }
}
