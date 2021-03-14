<?php

namespace App\Services\User\Service;

use App\Services\Domain\Entity\Domain;
use App\Services\Tag\Service\TagService;
use App\Services\User\Entity\User;
use App\Services\User\SyncEvent\NewsletterWasChanged;
use Doctrine\ORM\EntityManagerInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UserService
{
    public EntityManagerInterface $em;
    private TokenStorageInterface $securityStorage;
    private TagService $tagService;
    private EventDispatcherInterface $dispatcher;
    private UserManagerInterface $userManager;

    public function __construct(
        EntityManagerInterface $em,
        TokenStorageInterface $securityStorage,
        TagService $tagService,
        UserManagerInterface $userManager,
        EventDispatcherInterface $dispatcher
    ) {
        $this->dispatcher = $dispatcher;
        $this->em = $em;
        $this->securityStorage = $securityStorage;
        $this->tagService = $tagService;
        $this->userManager = $userManager;
    }


    public function getAll(): array
    {
        return $this->em->getRepository(User::class)->findBy(['enabled'=>true], ['created' => 'DESC']);
    }

    public function getAllInCommunity(): array
    {
        $concernedDomain = $this->getCommunityOfAdmin();
        return $this->em->getRepository(User::class)->findBy(['enabled'=>true, 'domains' => [$concernedDomain]], ['created' => 'DESC']);
    }


    public function findById(int $id): ?object
    {
        return $this->em->getRepository(User::class)->find($id);
    }

    public function findInCommunityById(int $id): ?object
    {
        $concernedDomain = $this->getCommunityOfAdmin();
        return $this->em->getRepository(User::class)->findOneBy(['id' => $id, 'domains' => [$concernedDomain]]);
    }

//    refactor patch !
    public function patch(User $params, $id = null)
    {

        // todo: separate in different methods
        if (null !== $id) {
            $patchedUser = $this->findById($id);
        } else {
            // we get it from security storage to avoid modifying other clients
            $patchedUser = $this->securityStorage->getToken()->getUser();
        }

        $oldValueForNewsletter = $patchedUser->getNewsletter();

        $allowedParameters = [
            'emailConfirmed',
            'firstName',
            'lastName',
            'profilUrl',
            'biographie',
            'intensity',
            'latitude',
            'longitude',
            'city',
            'showProfil',
            'newMessageNotification',
            'newMatchNotification',
            'newMessageEmail',
            'newMatchEmail',
            'newsletter',
        ];

        for ($i = 0; $i < count($allowedParameters); ++$i) {
            $getMethod = 'get'.ucfirst($allowedParameters[$i]);
            $setMethod = 'set'.ucfirst($allowedParameters[$i]);
            if ($params->$getMethod() !== null) {
                $patchedUser->$setMethod($params->$getMethod());
            }
        }

        // insert or update new tags in database
        if ($params->getTags()) {
            $patchedUser->setTags($this->tagService->beforePatchTags($patchedUser->getTags(), $params->getTags()));
        }

        $this->em->persist($patchedUser);
        $this->em->flush();

        if ($params->getNewsletter() !== null) {
            if ($oldValueForNewsletter !== $params->getNewsletter()) {
                $this->dispatcher->dispatch(new NewsletterWasChanged($patchedUser),NewsletterWasChanged::NAME);
            }
        }

        return $patchedUser;
    }

    public function patchCommunityAdmin($id, $params)
    {
        $patchedUser = $this->findById($id);
        foreach ($params as $key => $value) {
            $setMethod = 'set'.str_replace('_', '', ucwords($key, '_'));
            if ($value !== null) {
                $patchedUser->$setMethod($value);
            }
        }

        $this->em->persist($patchedUser);
        $this->em->flush();
        return $patchedUser;
    }

    public function patchAdmin($id, $params)
    {

        $patchedUser = $this->findById($id);

        foreach ($params as $key => $value) {
//            if ($key === 'tags') {
//                // insert or update new tags in database
//                $patchedUser->setTags($this->tagService->beforePatchTags($patchedUser->getTags(), $value));
//            } else
            if ($key === 'domains') {
                $patchedUser->setDomains($value->map(function($domain) {
                    return $this->em->getRepository(Domain::class)->find($domain->getId());
                }));
            } else {
                $setMethod = 'set'.str_replace('_', '', ucwords($key, '_'));
                if ($value !== null) {
                    $patchedUser->$setMethod($value);
                }
            }
        }

        if (
            $patchedUser->hasRole('ROLE_ADMIN')
            && count($patchedUser->getDomains()) > 1
        ) {
            throw new HttpException(400, "Can't have 2 domaines for an admin");
        }

        if (
            $patchedUser->hasRole('ROLE_ADMIN')
            && count($patchedUser->getDomains()) === 0
        ) {
            throw new HttpException(400, "admin must have 1 domain !");
        }

        $this->em->persist($patchedUser);
        $this->em->flush();
        return $patchedUser;

    }

    public function put($params)
    {

        // we get it from security storage to avoid modifying other clients
        $patchedUser = $this->securityStorage->getToken()->getUser();

        foreach ($params as $key => $value) {
            if ($key === 'tags') {
                // insert or update new tags in database
                $patchedUser->setTags($this->tagService->beforePatchTags($patchedUser->getTags(), $value));
            } else {
                $setMethod = 'set'.str_replace('_', '', ucwords($key, '_'));
                if ($value !== null) {
                    $patchedUser->$setMethod($value);
                }
            }
        }

        $this->em->persist($patchedUser);
        $this->em->flush();

        if (isset($params['newsletter'])) {
            $oldValueForNewsletter = $patchedUser->getNewsletter();
            if ($oldValueForNewsletter !== $params['newsletter']) {
                $this->dispatcher->dispatch(new NewsletterWasChanged($patchedUser),NewsletterWasChanged::NAME);
            }
        }

        return $patchedUser;
    }

    public function removeFromCommunity(int $id)
    {

        $concernedDomain = $this->getCommunityOfAdmin();

        $user = $this->findById($id);
        $userDomains = $user->getDomains();

        if ($userDomains.count() > 1) {
            $user->removeDomain($concernedDomain);
        } else if ($userDomains[0]->getId() === $concernedDomain->getId()) {
            $this->delete($id);
        }

        return new Response();
    }

    public function delete(int $id)
    {
        $user = $this->findById($id);
        $user->setEnabled(false);
        $user->setDeleted(new \DateTime('now', new \DateTimeZone('Europe/Paris')));
        $this->em->merge($user);
        $this->em->flush();
        return new Response();
    }

    public function post(User $user)
    {
        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }

    private function getCommunityOfAdmin()
    {
        $adminUser = $this->securityStorage->getToken()->getUser();
        return $adminUser->getDomains()[0];
    }

}
