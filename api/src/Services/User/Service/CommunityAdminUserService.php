<?php

namespace App\Services\User\Service;


use App\Services\Domain\Entity\Domain;
use App\Services\User\AsyncBusMessage\InviteFriendBusMessage;
use App\Services\User\AsyncBusMessage\NotifyUserCommunityInviteBusMessage;
use App\Services\User\Entity\User;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;

class CommunityAdminUserService
{

    public EntityManagerInterface $em;
    private MessageBusInterface $messageBusInterface;

    public function __construct(
        EntityManagerInterface $em,
        MessageBusInterface $messageBusInterface
    ) {
        $this->em = $em;
        $this->messageBusInterface = $messageBusInterface;
    }

    /**
     * @throws \Exception
     */
    public function addUserToCommunity($email, Domain $domain, $sendEmail = true)
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

            if ($sendEmail) {
                $this->messageBusInterface->dispatch(new NotifyUserCommunityInviteBusMessage($patchedUser->getId()));
            }
        } else {
            throw new \Exception('Not found', Response::HTTP_NOT_FOUND);
        }

        return $patchedUser;
    }


}
