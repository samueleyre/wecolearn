<?php

namespace App\Services\User\Event;

use App\Services\User\Entity\Token;
use App\Services\User\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class TokenWasCreated extends Event
{
    const NAME = 'TOKEN FOR CHANGING PASSWORD WAS CREATED';

    private $user;
    private $token;

    public function __construct(User $user, Token $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function getToken()
    {
        return $this->token;
    }
}
