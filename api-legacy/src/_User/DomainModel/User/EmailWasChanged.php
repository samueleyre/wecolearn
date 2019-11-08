<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 15/03/19
 * Time: 10:22
 */

namespace App\_User\DomainModel\User;

use Symfony\Component\EventDispatcher\Event;

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
