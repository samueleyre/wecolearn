<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 28/03/19
 * Time: 12:32
 */

namespace Tests\Utils;


use App\_Tag\DomainModel\Tag\Tag;
use App\_User\DomainModel\Image\Image;
use App\_User\DomainModel\User\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class CreateTestData
{

    private $container;
    public function __construct(ContainerInterface $container ) {
        $this->container = $container;
    }

    public function process() {

        $user1 = $this->createUserTest('edouard.touraille@gmail.com');
        $user2 = $this->createUserTest('edouard.touraille@laposte.net');
        $tag = $this->createTag();
        $user1->addTag( $tag );
        $user2->addTag( $tag );

        $em = $this->container->get('doctrine.orm.entity_manager');
        $em->merge( $user1 );
        $em->merge( $user2 );
        $em->flush();
    }

    private function createUserTest( $email ) {

        $userService = $this->container->get('create_user_service');

        $user = new User();
        $user->setEmail($email);
        $user->setFirstName('Edouard');
        $user->setPassword('test');
        $image = new Image();
        $image->setFileName('temp.png');
        $user->setImage($image);
        $user->setShowProfil(true);
        $user->setLatitude(45.75);
        $user->setLongitude(4.85);
        $userService->process($user);


        return $user;

    }

    private function createTag() {

        $tag = new Tag();
        $tag->setIteration(1);
        $tag->setType(0);
        $tag->setName('PHP');
        $tag->setCreated( new \DateTime());


        $em = $this->container->get('doctrine.orm.entity_manager');
        $em->persist( $tag );
        $em->flush();

        return $tag;
    }
}
