<?php


namespace App\DataFixtures\ORM;

use App\_Application\Domain\Domain;
use App\_User\DomainModel\Image\Image;
use App\Entity\SlackAccount;
use App\Entity\SlackTeam;
use App\_User\DomainModel\Token\Token;
use App\_User\DomainModel\User\User;
use App\_Chat\DomainModel\Message\Message;
use App\_Tag\DomainModel\Tag\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Persistence\ObjectManager;


class Fixtures extends Fixture
{

    private $generateUrlService;
    private $userService;
    private $manager;
    private $userManager;
    private $em;

    public function __construct()
    {

    }


    public function load(ObjectManager $manager)
    {
        $this->manager = $manager;
        $this->em = $this->container->get('doctrine.orm.entity_manager');
        $this->generateUrlService = $this->container->get('generate_url_service');
        $this->userService = $this->container->get('App\WcBundle\Service\UserService');
        $this->userManager = $this->container->get('fos_user.user_manager');
        $this->addCronTab();
        $this->addUsers();
    }

    private function addCronTab()
    {
        $query = "
                  INSERT INTO cron_job 
                  (`name`, `command`, `schedule`, `description`, `enabled`) 
                  VALUES 
                  ('send Reminder', 'app:sendReminder', '0 16 * * *', 'Envoie un mail quand le message n\'a pas été lu depuis 2 jours', 1)";
        $stmp = $this->em->getConnection()->prepare($query);
        $stmp->execute();
    }

    private function addUsers()
    {
        $userNames = ["Stanford", "Marcelino", "Chana", "Annelle", "Staci", "Zackary", "Asia", "Catherina", "Lisandra", "Doris", "Shena", "Priscilla", "Arturo", "Florene", "Yevette", "Alvina", "Shaunte", "Deanne", "Melia", "Allie", "Emelia", "Violet", "Kara", "Betty", "Nia", "Aleena", "Jasmin", "Aisha", "Troy", "Crystal", "Evangeline", "Cory", "Eva", "Leila", "Kristina", "Lena", "Xander", "Josh", "Rupert", "Morgan", "Pearl", "Albert", "Jared", "Felix", "Benjamin", "Ben", "Andre", "Ria", "Hazel", "Yasmin", "Yasmin", "Alexia", "Alexia", "Nicole", "Sienna", "India", "India", "Isie", "Karah", "Karah", "Louis", "Josiah", "Charlie", "Eddie", "Lukas", "Robin", "Nora", "Cory", "Sonny", "Owen", "Edgar", "Theodore", "George", "Alan", "Marc", "Jenna", "Felix", "Ronald", "Lawrence", "Douglas", "Claudia", "Niall", "Homer", "Jay", "Christopher", "Hashim", "Umar", "Alistair", "Euan", "Calvin", "Paulette", "Maurice", "JeanEud", "Edwige", "Phoebe", "Adele", "Zainab", "Eve", "Telsa", "Sue", "Suzie"];

        $lastNames = ["Sanjuanita", "Parthenia", "Phillip", "Ute", "Evangeline", "Alleen", "Codi", "Mayra", "Florence", "Pouit", "Evita", "Kandra", "Alfreda", "Teodoro", "Madge", "Sima", "Cinthia", "Owen", "Herta", "Hwa", "Harris", "Malone", "Beck", "Garrett", "Avila", "Ferguson", "O'Brien", "Powell", "Graves", "Zimmerman", "Caldwell", "Andrews", "Kent", "Bowden", "Thomas", "Porter", "Silva", "Robertson", "Spencer", "Singh", "Hogan", "Chen", "Daniel", "Burns", "Chavez", "Johnston", "Mckinney", "Morris", "George", "Sanchez", "White", "Watkins", "Chambers", "Marquez", "Freeman", "Soto", "Robinson", "Bradley", "Hall", "Olson", "Pierce", "Stewart", "Hamilton", "Cox", "Riley", "Ward", "Martin", "Ortega", "Evans", "Santiago", "Mcgee", "Flowers", "Higgins", "Moore", "Hicks", "Lowe", "Lawson", "Doyle", "Gibson", "Barnett", "Willis", "Bray", "Reid", "Norman", "Figueroa", "Herrera", "Fleming", "Carpenter", "Berry", "Perez", "Valencia", "Mccann", "Stewart", "Harrison", "Harmon", "Oliver", "Glover", "Guerrero", "Gonzalez", "Baker", "Wilson"];
        $userList = [];

        $fixedDomain = ['wecolearn'];
        $domain = new Domain();
        $domain->setName($fixedDomain[0]);


        $tag = new tag();
        $tags = [];

        $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));


        //Here we create a User with the Admin role
        $admin = new User();
        $admin->setUsername('admin');
        $admin->setEmail('admin@wecolearn.com');
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setPlainPassword('admin');
        $admin->setFirstName('Samuel');
        $admin->setLastName('Eyre');
        $admin->setEmailConfirmed(true);
        $user = $this->generateUrlService->process($admin);
        $admin->setCreated($date);
        $admin->setBiographie('');
        $admin->setIntensity(random_int(0, 200));
        $admin->setAtmosphere(random_int(0, 100));
        $admin->setLatitude(45.75);
        $admin->setLongitude(4.85);
        $admin->setEnabled(true);
        $admin->addDomain($domain);
        $this->userManager->updateUser($admin);


        // set Learn tags
        for ($i = 0; $i <= 100; $i++) {
            $tag = new Tag ();
            $tag->setName('tag' . $i);
            $tag->setType(0);
            $tag->setCreated($date);
            $tag->setIteration(random_int(0, 100));
            array_push($tags, $tag);
        }

        // set all types of Tags
        for ($i = 101; $i <= 200; $i++) {
            $tag = new Tag ();
            $tag->setName('tag' . $i);
            $tag->setType(random_int(0,2));
            $tag->setCreated($date);
            $tag->setIteration(random_int(0, 100));
            array_push($tags, $tag);
        }




        // create the rest of our fixtures and affiliate tags to users
        for ($i = 0; $i < count($userNames); $i++) {


            $user = new user();
            $token = new Token();
            $slackTeam = new SlackTeam();
            $slackAccount = new SlackAccount();

            $user->setUsername($userNames[$i] . $i);
            $user->setEmail('samuel.eyre+' . $i . '@hotmail.fr');
            $user->setRoles(['ROLE_USER']);
            $user->setPlainPassword('test');


            $user->setFirstName($userNames[$i]);
            $user->setLastName($lastNames[$i]);
            $user->setEmailConfirmed(true);
            $user = $this->generateUrlService->process($user);
            $user->setCreated($date);
            $user->setBiographie("Artisant en reconversion dans l'informatique, j'aimerais rencontrer d'autres personne motivées pour apprendre avec moi. J'ai un atelier à Lyon qui pourrait servir de lieu de rendez-vous. \n \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi tempus imperdiet nulla malesuada. Elit eget gravida cum sociis natoque penatibus. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Interdum consectetur libero id faucibus. Ac odio tempor orci dapibus ultrices. Sit amet luctus venenatis lectus. Id aliquet lectus proin nibh nisl. Donec ultrices tincidunt arcu non sodales neque. In tellus integer feugiat scelerisque varius. Nulla facilisi morbi tempus iaculis. Ut sem nulla pharetra diam sit. Mauris ultrices eros in cursus turpis massa tincidunt dui. Vel risus commodo viverra maecenas. Tempor orci eu lobortis elementum nibh tellus. In metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Id diam maecenas ultricies mi eget mauris.

In ante metus dictum at tempor commodo ullamcorper a lacus. Nibh praesent tristique magna sit amet purus gravida quis. Accumsan lacus vel facilisis volutpat est velit. Arcu odio ut sem nulla pharetra diam sit amet. Ultricies leo integer malesuada nunc. Elit sed vulputate mi sit amet mauris commodo. Mollis nunc sed id semper risus in hendrerit gravida rutrum. Massa sed elementum tempus egestas sed sed. Praesent tristique magna sit amet purus gravida. Facilisis magna etiam tempor orci.

Laoreet id donec ultrices tincidunt arcu non sodales. Rutrum quisque non tellus orci. Sollicitudin ac orci phasellus egestas. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Morbi tristique senectus et netus et. Tempus imperdiet nulla malesuada pellentesque elit. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing. Neque egestas congue quisque egestas diam in arcu. Eget sit amet tellus cras adipiscing enim eu turpis egestas.

Pulvinar mattis nunc sed blandit. Et netus et malesuada fames. Felis eget nunc lobortis mattis. Adipiscing bibendum est ultricies integer quis auctor elit. Placerat duis ultricies lacus sed turpis tincidunt id. In egestas erat imperdiet sed euismod nisi porta lorem. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Natoque penatibus et magnis dis parturient. Diam ut venenatis tellus in metus vulputate eu scelerisque felis. Sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Vel facilisis volutpat est velit egestas dui id. Malesuada pellentesque elit eget gravida. Aliquam ultrices sagittis orci a scelerisque purus semper. Ut morbi tincidunt augue interdum velit euismod in. Nunc faucibus a pellentesque sit amet porttitor. Interdum velit laoreet id donec ultrices tincidunt arcu non. At lectus urna duis convallis convallis tellus id interdum. Sem fringilla ut morbi tincidunt. Faucibus ornare suspendisse sed nisi lacus sed. Nibh sit amet commodo nulla facilisi.

Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. In cursus turpis massa tincidunt dui ut ornare lectus. Nibh tellus molestie nunc non blandit massa. Aliquam vestibulum morbi blandit cursus. Quis hendrerit dolor magna eget est lorem. Quis varius quam quisque id diam vel quam elementum. Sem nulla pharetra diam sit amet nisl suscipit. Magna eget est lorem ipsum. Velit dignissim sodales ut eu. Libero volutpat sed cras ornare arcu dui vivamus arcu. At risus viverra adipiscing at in tellus integer feugiat. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Id faucibus nisl tincidunt eget. Euismod in pellentesque massa placerat duis. Ipsum dolor sit amet consectetur adipiscing elit.");
            $user->setIntensity(random_int(0, 200));
            $user->setAtmosphere(random_int(0, 100));
            $user->setLatitude(45.75);
            $user->setLongitude(4.85);
            $user->setEnabled(true);
            $user->addDomain($domain);
            $user->setShowProfil(true);
            $user->setLastLogin($date);
            $user->setEmailNotifications(true);
            array_push($userList, $user);
            $this->manager->persist($domain);


            // tags
            $randLearnTag = $tags[random_int(0,99)];
            $randTag = $tags[random_int(0,count($tags)-1)];
            $randTag2 = $tags[random_int(0,count($tags)-1)];
            $randTag3 = $tags[random_int(0,count($tags)-1)];
            $randTag4 = $tags[random_int(0,count($tags)-1)];
            $randTags = [$randLearnTag, $randTag, $randTag2, $randTag3, $randTag4 ];
            $user->setTags($this->userService->patchTags(new ArrayCollection(), new ArrayCollection($randTags)));

            // default image
            $image = new Image();
            $image->setCreated($date);
            $image->setFileName('default');
            $image->setPublicId("6fe41d8233930805f9e32b2ae40ad96f");
            $image->setVersion("1549460112");
            $image->setUser($user);
            $this->manager->persist($image);

            $user->setImage($image);


            $token->setUser($user);
            $token->setCreated($date);
            $token->setToken('token' . $i);
            $token->setType(random_int(0, 100));
            $this->manager->persist($token);


            $slackTeam->setName('team' . $i);
            $slackTeam->setType('type' . $i);
            $slackTeam->setTeamId('Team' . $i);
            $this->manager->persist($slackTeam);

            $slackAccount->setUser($user);
            $slackAccount->setAccountId($user->getEmail());
            $slackAccount->setSlackTeam($slackTeam);
            $this->manager->persist($slackAccount);

            //Here we create many messages

            $message = new Message();
            $message->setCreated($date);
            $message->setIsRead(true);
            $message->setMessage('Salut ! Tu t\'intéresses à la batterie ?' );
            $message->setSender($user);
            $message->setReceiver($admin);
            $this->manager->persist($message);


            $this->userManager->updateUser($user);
        }

        $this->manager->flush();
    }


}
