<?php


namespace WcBundle\DataFixtures\ORM;

use WcBundle\Entity\Client;
use WcBundle\Entity\Selection;
use WcBundle\Entity\Tag;
use AppBundle\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;



class Fixtures extends Fixture implements ContainerAwareInterface
{


    public function load(ObjectManager $manager)
    {

        $usernames = ["Stanford", "Marcelino", "Chana", "Annelle", "Staci", "Zackary", "Asia", "Catherina", "Lisandra", "Doris", "Shena", "Priscilla", "Arturo", "Florene", "Yevette", "Alvina", "Shaunte", "Deanne", "Melia", "Allie"];
        $names = ["Sanjuanita","Parthenia","Phillip","Ute","Evangeline","Alleen","Codi","Mayra","Florence","Velvet","Evita","Kandra","Alfreda","Teodoro","Madge","Sima","Cinthia","Owen","Herta","Hwa"];
        $tagNames = ["php", "html" ,"js", "git", "docker", "symfony", "bashrc", "security", "sql", "reactJS"];
        $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
        $clients = [];
        $tags = [];

        $types = [0,1,2];

        $userManager = $this->container->get('fos_user.user_manager');


        for ($i = 0; $i < count($tagNames)-1; $i++) {
            $rand = random_int(0, 2);
            $tag = new Tag();
            $tag->setName($tagNames[$i]);
            $tag->setCreated($date);
            $tag->setType($types[$rand]);
            $manager->persist($tag);
            $tags[] = $tag;
        }



        for ($i = 0; $i < count($usernames); $i++) {

            $user = new User();
            $user->addRole('ROLE_USER');
            $user->setPassword(null);
            $user->setUsername($usernames[$i]);
            $user->setEmail($usernames[$i]."@hotmail.fr");
            $user->setPlainPassword("test");
            $user->setEnabled(true);

            $userManager->updateUser( $user );

            $user = $userManager->findUserByUsername($user->getUsername());

            $client = new Client();
                $client->setUser($user);
            $client->setFirstName($usernames[$i]);
            $client->setLastName($names[$i]);
            $client->setProfilUrl($user->getUsername());
            $client->setBiographie("test");
            $client->setLatitude("10.55");
            $client->setLongitude("45.24");
            if (count($clients) > 0) {
                $rand = random_int(0, count($clients)-1);
                $selection = new Selection();
                $selection->addClient($clients[$rand]);
                $selection->setClient($client);
                $manager->persist($selection);

                $client->setSelection($selection);
                $clients[$rand]->addSelected($selection);

                $manager->persist($selection);
                $manager->persist($clients[$rand]);

            }
            $client->setCreated($date);

            $rand = random_int(0, count($tags)-1);

            $client->addTag($tags[$rand]);
            $manager->persist($client);
            $manager->persist($tags[$rand]);
            $clients[] = $client;

        }


        $manager->flush();

    }
}
