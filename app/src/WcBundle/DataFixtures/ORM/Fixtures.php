<?php


namespace WcBundle\DataFixtures\ORM;

use WcBundle\Entity\User;
use WcBundle\Entity\Selection;
use WcBundle\Entity\Message;
use WcBundle\Entity\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;



class Fixtures extends Fixture implements ContainerAwareInterface
{


    public function load(ObjectManager $manager)
    {

        $firstNames = ["Stanford", "Marcelino", "Chana", "Annelle", "Staci", "Zackary", "Asia", "Catherina", "Lisandra", "Doris", "Shena", "Priscilla", "Arturo", "Florene", "Yevette", "Alvina", "Shaunte", "Deanne", "Melia", "Allie"];
        $lastNames = ["Sanjuanita","Parthenia","Phillip","Ute","Evangeline","Alleen","Codi","Mayra","Florence","Velvet","Evita","Kandra","Alfreda","Teodoro","Madge","Sima","Cinthia","Owen","Herta","Hwa"];
        $tagNames = ["Php", "Html" ,"Js", "Git", "Docker", "Symfony", "Bashrc","LignesDeCommandes", "CyberSecurity", "Sql", "reactJS", "AngularJs" ];


        $texts = ["How are you  ?", "What's you fb ?", "Give me your phoneNumber", "What do you do for a living ? ", "Do you play chess ? ", "Do you won't to make money out of it ? ", "How far is that ?", "What is the name of your meetup group ?"];
        $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));

        $clients = [];
        $tags = ["Php", "Html" ,"Js", "Git", "Docker", "Symfony", "Bashrc","LignesDeCommandes", "CyberSecurity", "Sql", "reactJS", "AngularJs" ];
        $messages = [];


        for ($i= 0; $i < count($firstNames); $i++) {
            $user = new user();
            $user -> setFirstName(array_rand($firstNames,1));
            $user -> setLastName(array_rand($lastNames, 1));
            $user -> setEmailConfirmed(bool(rand_int(0,1)));
            $user -> setBiographie('bio'.$i);
            $user -> setTags(array_rand($tags, 2));


        }
    }

//        $phpTag = null;
//
//
//        for ($i = 0; $i < count($usernames); $i++) {
//            $rand = random_int(0, 30);
//            $usernames[$i] = $usernames[$i].$rand;
//            $rand = random_int(0, 30);
//            $names[$i] = $names[$i].$rand;
//        }
//
//        $types = [0,1,2];

//
//        $userManager = $this->container->get('fos_user.user_manager');
//
//
//        for ($i = 0; $i < count($tagNames)-1; $i++) {
//            $rand = random_int(0, 2);
//            $randIteration = random_int(0, 20);
//            $tag = new Tag();
//            $tag->setName($tagNames[$i]);
//            $tag->setCreated($date);
//            $tag->setType($types[$rand]);
//            $tag->setIteration($randIteration);
//            $manager->persist($tag);
//
//            if( $tagNames[$i] == 'Php') {
//                $phpTag = $tag;
//            }
//            $tags[] = $tag;
//        }
//
//
//
//        for ($i = 0; $i < count($usernames); $i++) {
//
//            $user = new User();
//            $user->addRole('ROLE_USER');
//            $user->setUsername($usernames[$i]);
//            $user->setEmail("samuel.eyre"+$i+"00@hotmail.fr");
//            $user->setPlainPassword("test");
//            $user->setEnabled(true);
//
//
//
//            $user = $userManager->findUserByUsername($user->getUsername());
//
//            $client = new User();
//                $client->setUser($user);
//            $client->setFirstName($usernames[$i]);
//            $client->setLastName($names[$i]);
//            $client->setProfilUrl($user->getUsername());
//            $client->setBiographie("test");
//            $rand = random_int(0, 5);
//            $client->setIntensity($rand);
//            $rand = random_int(0, 3);
//            $client->setAtmosphere($rand);
//            $rand = random_int(0, 100) / 100;
//            $client->setLatitude((10.55 + $rand));
//            $client->setLongitude((45.24 + $rand));
//            if (count($clients) > 0) {
//                $rand = random_int(0, count($clients)-1);
//                //$selection = new Selection();
//                //$selection->addClient($clients[$rand]);
//                //$selection->setClient($client);
//                //$manager->persist($selection);
//
//                //$client->setSelection($selection);
//                //$clients[$rand]->addSelected($selection);
//
//                //$manager->persist($selection);
//                $manager->persist($clients[$rand]);
//
//            }
//            $client->setCreated($date);
//            $client->setUserUpdated($date);
//
//            $randChosen = [];
//            for($j=0; $j< 4; $j++) {
//                $rand = random_int(0, count($tags)-1);
//                if (! array_search($rand, $randChosen) && array_search($rand, $randChosen) !== 0) {
//                    $client->addTag($tags[$rand]);
//                    //$client->addTag($phpTag);
//                }
//                $randChosen[] = $rand;
//            }
//            $manager->persist($client);
//            $manager->persist($tags[$rand]);
//            $clients[] = $client;
//
//        }
//
//        for ($i = 0; $i < count($texts)-1; $i++) {
//            shuffle($clients);
//            $message = new Message();
//            $message->setMessage($texts[$i]);
//            $message->setCreated($date);
//            $message->setReceiver($clients[0]);
//            $message->setSender($clients[1]);
//            $rand = random_int(0, 30);
//            $date = new \DateTime("now + ".$rand." minutes", new \DateTimeZone('Europe/Paris'));
//            $message->setCreated($date);
//            $manager->persist($message);
////            $manager->persist($clients[$r1]);
////            $manager->persist($clients[$r2]);
//        }
//
//
//        $manager->flush();
//
//    }

}
