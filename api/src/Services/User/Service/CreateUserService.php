<?php

namespace App\Services\User\Service;

use App\Services\Core\Exception\ResourceAlreadyUsedException;
use App\Services\Domain\Service\AddDomainService;
use App\Services\Tag\Service\TagService;
use App\Services\User\Entity\User;
use App\Services\User\SyncEvent\UserWasCreated;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CreateUserService
{
    private UserManagerInterface $userManager;
    private EventDispatcherInterface $dispatcher;
    private AddDomainService $addDomainService;
    private GenerateUrlService $generateUrlService;
    private TagService $tagService;

    public function __construct(
        UserManagerInterface $userManager,
        EventDispatcherInterface $dispatcher,
        AddDomainService $addDomainService,
        GenerateUrlService $generateUrlService,
        TagService $tagService
    ) {
        $this->userManager = $userManager;
        $this->dispatcher = $dispatcher;
        $this->addDomainService = $addDomainService;
        $this->generateUrlService = $generateUrlService;
        $this->tagService = $tagService;
    }

    public function process(User $user)
    {

        $user = $this->addDomainService->process($user);
        $user->setRoles(['ROLE_USER']);
        $user->setPlainPassword($user->getPassword());
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
            // set lyon if missing
            $user->setLatitude(45.75);
            $user->setLongitude(4.85);
            $user->setCity('Lyon');
        }

        $user->setUsername($user->getEmail()); // todo: remove this someday
        $user = $this->generateUrlService->process($user);
        $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
        $user->setCreated($date);
        try {
            $this->userManager->updateUser($user);
        } catch (UniqueConstraintViolationException $e) {
            throw new ResourceAlreadyUsedException('resource already used');
        }

        $this->dispatcher->dispatch(new UserWasCreated($user),UserWasCreated::NAME);

        return $user;
    }
}
