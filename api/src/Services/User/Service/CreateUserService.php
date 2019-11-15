<?php

namespace App\Services\User\Service;

use App\Services\Core\Exception\ResourceAlreadyUsedException;
use App\Services\Tag\Service\TagService;
use App\Services\User\Entity\User;
use App\Services\User\Events\UserWasCreated;
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
    private $tagService;

    public function __construct(
        UserManagerInterface $userManager,
        EventDispatcherInterface $dispatcher,
        //            AddDomainService $addDomainService,
        GenerateUrlService $generateUrlService,
        TagService $tagService
    ) {
        $this->userManager = $userManager;
        $this->dispatcher = $dispatcher;
//        $this->addDomainService = $addDomainService;
        $this->generateUrlService = $generateUrlService;
        $this->tagService = $tagService;
    }

    public function process(User $user)
    {

        //todo fix : serialization should be enough.
//        $user->getImage()->setCreated(new \DateTime());
//        $user = $this->addDomainService->process($user);
        $user->setRoles(['ROLE_USER']);
        $user->setPlainPassword($user->getPassword());
        if ($user->getTags()) {
            $user->setTags($this->tagService->beforePatchTags(new ArrayCollection(), $user->getTags()));
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
            new UserWasCreated(
                $user
            )
        );

        return $user;
    }
}
