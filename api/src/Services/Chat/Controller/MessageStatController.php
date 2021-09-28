<?php

namespace App\Services\Chat\Controller;

use App\Services\Chat\Entity\Message;
use App\Services\User\Entity\User;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class MessageStatController extends AbstractController
{
    /**
     * @Get("community-admin/message/stat/{communityId}")
     * @param TokenStorageInterface $tokenStorage
     * @return mixed
     * @throws \Exception
     */
    public function getMessageMatchsAction(int $communityId, TokenStorageInterface $tokenStorage)
    {
        $user = $tokenStorage->getToken()->getUser();

        if(
            !($user->isSuperAdmin() || $user->hasDomain($communityId))
        ) {
            throw new \Exception('Pas autorisé !', 403);
        }

        $numberOfConversationsInCommunity = $this->getDoctrine()
            ->getRepository(Message::class)
            ->countConversationsInCommunity($communityId);

        $numberOfPeopleInCommunity = $this->getDoctrine()
            ->getRepository(User::class)
            ->countInCommunity($communityId);

        $numberOfConversationsInCommunityLastWeek = $this->getDoctrine()
            ->getRepository(Message::class)
            ->countPastWeekConversationsInCommunity($communityId);

        $numberOfPeopleInCommunityLastWeek = $this->getDoctrine()
            ->getRepository(User::class)
            ->countPastWeekNewUsersInCommunity($communityId);

        return [
            "global" => [
                "conversations" => floatval($numberOfConversationsInCommunity),
                "people" => floatval($numberOfPeopleInCommunity),
                "averageConversation" => round($numberOfConversationsInCommunity / (floatval($numberOfPeopleInCommunity) > 0 ? $numberOfPeopleInCommunity : 1), 4)
            ],
            "lastWeek" => [
                "conversations" => floatval($numberOfConversationsInCommunityLastWeek),
                "people" => floatval($numberOfPeopleInCommunityLastWeek),
            ]
        ];
    }
}
