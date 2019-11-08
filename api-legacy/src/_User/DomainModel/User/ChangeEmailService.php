<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 21/03/19
 * Time: 15:04
 */

namespace App\_User\DomainModel\User;


use App\WcBundle\Service\UserService;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class ChangeEmailService
{

    private $userService;
    private $dispatcher;

    public function __construct(UserService $userService, EventDispatcherInterface$dispatcher ) {
        $this->userService = $userService;
        $this->dispatcher = $dispatcher;
    }

    public function process( User $user, string $email ) {

        $user->setEmail($email);
        $user->setEmailConfirmed(false);
        $this->userService->patch($user);
        $this->dispatcher->dispatch('emailChanged', new EmailWasChanged($user));
        return $user;

    }

}
