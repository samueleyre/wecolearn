<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 17/03/19
 * Time: 12:49
 */

namespace App\_User\DomainModel\User;


use App\_User\DomainModel\Token\Token;
use Symfony\Component\EventDispatcher\Event;

class TokenWasCreated extends Event
{
    const NAME = 'TOKEN FOR CHANGING PASSWORD WAS CREATED';

    private $user;
    private $token;

    public function __construct( User $user, Token $token ) {
        $this->user = $user;
        $this->token = $token;
    }

    public function getUser() {
        return $this->user;
    }

    public function getToken() {
        return $this->token;
    }
}
