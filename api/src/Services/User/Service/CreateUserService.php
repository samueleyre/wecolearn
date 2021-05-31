<?php

namespace App\Services\User\Service;

use App\Services\Domain\Service\DomainService;
use App\Services\Tag\Service\TagService;
use App\Services\User\Entity\User;
use App\Services\User\SyncEvent\UserWasCreated;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CreateUserService
{
    private UserManagerInterface $userManager;
    private EventDispatcherInterface $dispatcher;
    private GenerateUrlService $generateUrlService;
    private TagService $tagService;
    private DomainService $domainService;

    public function __construct(
        UserManagerInterface $userManager,
        EventDispatcherInterface $dispatcher,
        GenerateUrlService $generateUrlService,
        TagService $tagService,
        DomainService $domainService
    ) {
        $this->userManager = $userManager;
        $this->dispatcher = $dispatcher;
        $this->generateUrlService = $generateUrlService;
        $this->tagService = $tagService;
        $this->domainService = $domainService;
    }

    public function process(User $user, $roles = ['ROLE_USER']): User
    {

//        if no domain set default domain
        if ($user->getDomains() === null || count($user->getDomains()) === 0) {
            $user->addDomain($this->domainService->defaultDomain());
        }

        $user->setRoles($roles);
        if (!$user->getPassword()) {
            $user->setPlainPassword(random_bytes(10));
        } else {
            $user->setPlainPassword($user->getPassword());
        }
        if ($user->getTags()) {
            $user->setTags($this->tagService->beforePatchTags(new ArrayCollection(), $user->getTags()));
        }

        $user->setEnabled(true);
        $user->setShowProfil(true);
        $user->setEmailConfirmed(false);
        $user->setNewMessageNotification(true);
        $user->setNewMatchNotification(true);
        $user->setNewMessageEmail(true);
        $user->setNewMatchEmail(true);
        $user->setIntensity(5);

        if (!$user->getLatitude()) {
//            todo: in config file !
            $user->setLatitude(45.75);
            $user->setLongitude(4.85);
            $user->setCity('Lyon');
        }

//        todo: remove this someday
        $user->setUsername($user->getEmail());

        $user = $this->generateUrlService->process($user);

//        todo: in constructor !
        $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
        $user->setCreated($date);

        if (
            $user->hasRole('ROLE_ADMIN')
            && count($user->getDomains()) === 0
        ) {
            throw new HttpException(Response::HTTP_BAD_REQUEST, "admin must have 1 domain !");
        }

        try {
            $this->userManager->updateUser($user);
        } catch (UniqueConstraintViolationException $e) {
            throw new HttpException(Response::HTTP_CONFLICT, "email already taken");
        }

        $this->dispatcher->dispatch(new UserWasCreated($user),UserWasCreated::NAME);

        return $user;
    }
}
