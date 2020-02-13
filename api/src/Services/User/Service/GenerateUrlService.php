<?php

namespace App\Services\User\Service;

use App\Services\User\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class GenerateUrlService
{
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function process(User &$user): User
    {
        $this->newUrl($user);

        while ($this->em->getRepository(User::class)->findBy(['profilUrl' => $user->getProfilUrl()])) {
            $this->newUrl($user);
        }

        return $user;
    }

    private function newUrl(User &$user)
    {
        $userName = "{$user->getFirstName()}"."{$user->getLastName()}";
        if ($userName === $user->getProfilUrl()) {
            $userName .= rand(0, 9);
        }
        $user->setProfilUrl($userName);
    }
}
