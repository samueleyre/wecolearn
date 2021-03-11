<?php

namespace App\Services\Core\DataFixtures\ORM;

use App\Services\Chat\Entity\Message;
use App\Services\Core\DataFixtures\ORM\Constant\TagDomainsOrmConstant;
use App\Services\Core\DataFixtures\ORM\Constant\TagOrmConstant;
use App\Services\Core\DataFixtures\ORM\Constant\UserConstant;
use App\Services\Domain\Entity\Domain;
use App\Services\Tag\Entity\Tag;
use App\Services\Tag\Entity\TagDomain;
use App\Services\Tag\Service\TagDomainService;
use App\Services\Tag\Service\TagService;
use App\Services\User\Entity\Image;
use App\Services\User\Entity\Token;
use App\Services\User\Entity\User;
use App\Services\User\Service\UserService;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class Fixtures extends Fixture implements FixtureInterface, ContainerAwareInterface
{
    private $generateUrlService;
    private UserService $userService;
    private TagService $tagService;
    private TagDomainService $tagDomainService;
    private ObjectManager $manager;
    private $userManager;
    private array $tagDomains = [];
    private array $tags = [];

    private ?ContainerInterface $container;

    public function __construct(
        TagService $tagService,
        UserService $userService,
        TagDomainService $tagDomainService
    ) {
        $this->tagService = $tagService;
        $this->userService = $userService;
        $this->tagDomainService = $tagDomainService;
    }


    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {
        $this->manager = $manager;
        $this->generateUrlService = $this->container->get('generate_url_service');
        $this->userManager = $this->container->get('fos_user.user_manager');
        $this->addTagDomains();
        $this->addTags();
        $this->addUsers();
    }

    private function addTagDomains() {
        $tagDomains = TagDomainsOrmConstant::$LIST;

        $index = 0;
        foreach ($tagDomains as $tagDomainParam) {

            $tagDomain = new TagDomain();
            $tagDomain->setName($tagDomainParam['name']);
            $tagDomain->setEmoji($tagDomainParam['emoji']);
            $tagDomain->setHexcolor($tagDomainParam['hexcolor']);

            $this->tagDomainService->create($tagDomain);

            array_push($this->tagDomains,$tagDomain);
            $index++;
        }


    }

    private function addTags() {

        // set Learn tags
        for ($i = 0; $i < count(TagOrmConstant::$RAND); ++$i) {
            $tag = new Tag();
            $tag->setName(TagOrmConstant::$RAND[$i]);
            $tag->setType(0);
            $tag->setIteration(random_int(0, 100));
            $tag->addTagDomain($this->tagDomains[random_int(0, count(TagDomainsOrmConstant::$LIST)-1)]);
            array_push($this->tags, $tag);
        }

        // set all types of Tags
        for ($i = 0; $i < count(TagOrmConstant::$RAND); ++$i) {
            $tag = new Tag();
            $tag->setName(TagOrmConstant::$RAND[$i]);
            $tag->setType(random_int(1, 2));
            $tag->setIteration(random_int(0, 100));
            array_push($this->tags, $tag);
        }
    }

    private function addUsers()
    {
        $firstNames = UserConstant::$FIRSTNAMES;
        $lastNames = UserConstant::$LASTNAMES;

        $userList = [];

        $fixedDomain = ['wecolearn'];
        $domain = new Domain();
        $domain->setName($fixedDomain[0]);

        $date = new \DateTime('now', new \DateTimeZone('Europe/Paris'));

        //Here we create a User with the Admin role
        $admin = new User();
        $admin->setUsername('admin');
        $admin->setEmail('samuel@wecolearn.com');
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setPlainPassword('admin1234');
        $admin->setFirstName('Samuel');
        $admin->setLastName('Eyre');
        $admin = $this->generateUrlService->process($admin);
        $admin->setEmailConfirmed(true);
        $admin->setBiographie('');
        $admin->setIntensity(random_int(0, 45));
        $admin->setLatitude(45.75);
        $admin->setLongitude(4.85);
        $admin->setCity('Lyon');
        $admin->setEnabled(true);
        $admin->addDomain($domain);
        $admin->setShowProfil(false);
        $admin->setNewMessageNotification(false);
        $admin->setNewMatchNotification(false);
        $admin->setNewMessageEmail(true);
        $admin->setNewMatchEmail(true);
        $admin->setNewsletter(false);
        $this->userManager->updateUser($admin);

        // create the rest of our fixtures and affiliate tags to users
        for ($i = 0; $i < count($firstNames); ++$i) {
            $user = new user();
            $token = new Token();
//            $slackTeam = new SlackTeam();
//            $slackAccount = new SlackAccount();

            $user->setUsername($firstNames[$i].$i);
            $user->setEmail('samuel.eyre+'.$i.'@hotmail.fr');
            $user->setRoles(['ROLE_USER']);
            $user->setPlainPassword('password');
            $user->setFirstName($firstNames[$i]);
            $user->setLastName($lastNames[$i]);
            $user->setEmailConfirmed(true);
            $user = $this->generateUrlService->process($user);
            $user->setBiographie(UserConstant::$BIO);
            $user->setIntensity(random_int(0, 45));
            $user->setLatitude(45.75);
            $user->setLongitude(4.85);
            $user->setCity('Lyon');
            $user->setEnabled(true);
            $user->addDomain($domain);
            $user->setShowProfil(true);
            $user->setLastLogin($date);
            $user->setNewMessageNotification(true);
            $user->setNewMatchNotification(true);
            $user->setNewMessageEmail(true);
            $user->setNewMatchEmail(true);
            $user->setNewsletter(true);
            array_push($userList, $user);
            $this->manager->persist($domain);

            // tags
            $randLearnTag = $this->tags[random_int(0, count(TagOrmConstant::$RAND)-1)];
            $randLearnTag2 = $this->tags[random_int(0, count(TagOrmConstant::$RAND)-1)];
            $randLearnTag3 = $this->tags[random_int(0, count(TagOrmConstant::$RAND)-1)];
            $randTag = $this->tags[random_int(count(TagOrmConstant::$RAND), count($this->tags) - 1)];
            $randTag2 = $this->tags[random_int(count(TagOrmConstant::$RAND), count($this->tags) - 1)];
            $randTag3 = $this->tags[random_int(count(TagOrmConstant::$RAND), count($this->tags) - 1)];
            $randTag4 = $this->tags[random_int(count(TagOrmConstant::$RAND), count($this->tags) - 1)];
            $randTags = [$randLearnTag, $randLearnTag2, $randLearnTag3, $randTag, $randTag2, $randTag3, $randTag4];
            $user->setTags($this->tagService->beforePatchTags(new ArrayCollection(), new ArrayCollection($randTags)));

            // default image
            $image = new Image();
            $image->setFileName('default');
            $image->setPublicId('8563756134c1dcedf3948085cbf86576');
            $image->setVersion('1549462499');
            $image->setUser($user);
            $this->manager->persist($image);

            $user->setImage($image);

            $token->setUser($user);
            $token->setCreated($date);
            $token->setToken('token'.$i);
            $token->setType(random_int(0, 100));
            $this->manager->persist($token);

//            $slackTeam->setName('team' . $i);
//            $slackTeam->setType('type' . $i);
//            $slackTeam->setTeamId('Team' . $i);
//            $this->manager->persist($slackTeam);

//            $slackAccount->setUser($user);
//            $slackAccount->setAccountId($user->getEmail());
//            $slackAccount->setSlackTeam($slackTeam);
//            $this->manager->persist($slackAccount);

//             Here we create many messages
            $message = new Message();
            $message->setCreated($date);
            $message->setIsRead(true);
            $message->setMessage('Salut ! Tu t\'intéresses à la batterie ?');
            $message->setSender($user);
            $message->setReceiver($admin);
            $this->manager->persist($message);

            $this->userManager->updateUser($user);
        }

        $this->manager->flush();
    }
}
