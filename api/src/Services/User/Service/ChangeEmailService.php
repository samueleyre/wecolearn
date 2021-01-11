<?php

namespace App\Services\User\Service;

use App\Services\User\Entity\User;
use App\Services\User\SyncEvent\EmailWasChanged;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class ChangeEmailService
{

    private $userService;
    private $dispatcher;

    public function __construct(UserService $userService, EventDispatcherInterface $dispatcher)
    {
        $this->userService = $userService;
        $this->dispatcher = $dispatcher;
    }

    public function process(User $user, string $email)
    {
        $user->setOldEmail($user->getEmail());
        $user->setEmail($email);
        $user->setEmailConfirmed(false);
        $this->userService->patch($user);
        $this->dispatcher->dispatch(new EmailWasChanged($user), EmailWasChanged::NAME);
        return $user;
    }
}
