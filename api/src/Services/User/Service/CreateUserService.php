<?php

namespace App\Services\User\Service;

use App\Services\Core\Exception\ResourceAlreadyUsedException;
use App\Services\User\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CreateUserService
{

    private $userManager;
    private $dispatcher;
//    private $addDomainService;
    private $generateUrlService;
    private $userService;

    public function __construct(
        UserManagerInterface $userManager,
        EventDispatcherInterface $dispatcher,
        //            AddDomainService $addDomainService,
        GenerateUrlService $generateUrlService,
        UserService $userService
    ) {
        $this->userManager = $userManager;
        $this->dispatcher = $dispatcher;
//        $this->addDomainService = $addDomainService;
        $this->generateUrlService = $generateUrlService;
        $this->userService = $userService;
    }

    public function process(User $user)
    {

        /*
        if ( $this->getParameter("environment") === "dev" ) {
            $retEmail = false;
        }
        */
        $ret = [];

        //todo fix : serialization should be enough.
//        $user->getImage()->setCreated(new \DateTime());

//        $user = $this->addDomainService->process($user);
        $user->setRoles(['ROLE_USER']);
        $user->setPlainPassword($user->getPassword());
        if ($user->getTags()) {
            $user->setTags($this->userService->patchTags(new ArrayCollection(), $user->getTags()));
        }
        $user->setEnabled(true);
        $user->setShowProfil(true);
        $user->setUsername($user->getEmail());
        $user = $this->generateUrlService->process($user);
        $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
        $user->setCreated($date);
        try {
            $this->userManager->updateUser($user);
        } catch (UniqueConstraintViolationException $e) {
            throw new ResourceAlreadyUsedException('resource already used');
        }
        $this->dispatcher->dispatch(
            'userCreated',
            new UserWasCreated(
                $user
            )
        );

        return $user;
    }
}
