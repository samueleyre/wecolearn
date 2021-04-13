<?php

namespace App\Services\User\Service;


use App\Services\Domain\Entity\Domain;
use App\Services\User\Entity\User;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CommunityAdminUserService
{

    public EntityManagerInterface $em;

    public function __construct(
        EntityManagerInterface $em
    ) {
        $this->em = $em;
    }

    /**
     * @throws \Exception
     */
    public function addUserToCommunity($email, Domain $domain)
    {
        $patchedUser = $this->em->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($patchedUser) {
            try {
                $patchedUser->addDomain($domain);
                $this->em->persist($patchedUser);
                $this->em->flush();
            } catch (UniqueConstraintViolationException $e) {
                throw new \Exception('already present in community', Response::HTTP_CONFLICT);
            }

            // todo :send email to notify user !
        } else {
            throw new \Exception('Not found', Response::HTTP_NOT_FOUND);
        }

        return $patchedUser;
    }


}
