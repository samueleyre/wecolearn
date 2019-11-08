<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 16/03/19
 * Time: 12:18
 */
namespace App\_User\DomainModel\User;

use Doctrine\ORM\EntityManagerInterface;

class GenerateUrlService {

    public function __construct( EntityManagerInterface $em ) {
        $this->em = $em;
    }

    public function process(User &$user ) {

        $this->newUrl($user);

        while($this->em->getRepository(User::class)->findBy(["profilUrl"=> $user->getProfilUrl()])) {
            $this->newUrl($user);
        }

        return $user;
    }

    private function newUrl(User &$user) {

        $userName = $user->getUsername();
        if ($userName  === $user->getProfilUrl()) {
            $userName .= rand(0,9);
        }
        $user->setProfilUrl($userName);

    }
}
