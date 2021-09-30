<?php

namespace App\Services\Core\DataFixtures\ORM;

use App\Services\Chat\Entity\Message;
use App\Services\Core\DataFixtures\ORM\Constant\CommunityOrmConstant;
use App\Services\Core\DataFixtures\ORM\Constant\MessageConstant;
use App\Services\Core\DataFixtures\ORM\Constant\TagDomainsOrmConstant;
use App\Services\Core\DataFixtures\ORM\Constant\TagOrmConstant;
use App\Services\Core\DataFixtures\ORM\Constant\UserConstant;
use App\Services\Domain\Entity\Domain;
use App\Services\Shared\Entity\Token;
use App\Services\Tag\Entity\Tag;
use App\Services\Tag\Entity\TagDomain;
use App\Services\Tag\Service\TagDomainService;
use App\Services\Tag\Service\TagService;
use App\Services\Shared\Entity\Image;
use App\Services\User\Constant\TokenConstant;
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
    private array $domains = [];

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
        $this->addCommunities();
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
            $tagData = TagOrmConstant::$RAND[$i];
            $tag = new Tag();
            $tag->setName($tagData['name']);
            $tag->setType(0);
            $tag->setIteration(random_int(0, 100));
            foreach( $tagData['tag_domaine_indexes'] as $tagDomainIndex ) {
                dump($tagDomainIndex);
                dump($this->tagDomains[$tagDomainIndex]);
                $tag->addTagDomain($this->tagDomains[$tagDomainIndex]);
            }
            array_push($this->tags, $tag);
        }

        // set all types of Tags
        for ($i = 0; $i < count(TagOrmConstant::$RAND); ++$i) {
            $tagData = TagOrmConstant::$RAND[$i];
            $tag = new Tag();
            $tag->setName($tagData['name']);
            $tag->setType(random_int(1, 2));
            $tag->setIteration(random_int(0, 100));
            array_push($this->tags, $tag);
        }
    }

    private function addCommunities() {

        $domains = CommunityOrmConstant::$COMMUNITIES;

        foreach ($domains as $domain) {
            $newDomain = new Domain();
            $newDomain->setName($domain['name']);
            $newDomain->setIsMain($domain['is_main']);
            $token = new Token();
            $token->setToken(bin2hex(random_bytes(16)));
            $token->setType(TokenConstant::$types["COMMUNITY_INVITE"]);
            $token->setDomain($newDomain);
            $newDomain->setInviteToken($token);
            $this->manager->persist($token);
            $this->manager->persist($newDomain);
            array_push($this->domains, $newDomain);
        }

    }

    private function addCommunityAdmins() {

        foreach ($this->domains as $domain) {

            // community admins
            //Here we create a User with the Admin role
            $communityAdmin = new User();
            $communityAdmin->setUsername("admin".$domain->getId());
            $communityAdmin->setEmail("samuel+".$domain->getId()."@wecolearn.com");
            $communityAdmin->setRoles(['ROLE_ADMIN']);
            $communityAdmin->setPlainPassword('admin1234');
            $communityAdmin->setFirstName($domain->getName());
            $communityAdmin->setLastName("admin");
            $communityAdmin = $this->generateUrlService->process($communityAdmin);
            $communityAdmin->setEmailConfirmed(true);
            $communityAdmin->setBiographie('');
            $communityAdmin->setIntensity(random_int(0, 45));
            $communityAdmin->setLatitude(45.75);
            $communityAdmin->setLongitude(4.85);
            $communityAdmin->setCity('Lyon');
            $communityAdmin->setEnabled(true);
            $communityAdmin->addDomain($domain);
            $communityAdmin->setAdminDomain($domain);
            $domain->addCommunityAdmin($communityAdmin);
            $this->manager->persist($domain);
            $communityAdmin->setShowProfil(false);
            $communityAdmin->setNewMessageNotification(false);
            $communityAdmin->setNewMatchNotification(false);
            $communityAdmin->setNewMessageEmail(true);
            $communityAdmin->setNewMatchEmail(true);
            $communityAdmin->setNewsletter(false);
            $this->userManager->updateUser($communityAdmin);
        }
    }

    private function addUsers()
    {
        $firstNames = UserConstant::$FIRSTNAMES;
        $lastNames = UserConstant::$LASTNAMES;

        $userList = [];

        //Here we create a User with the Admin role
        $admin = new User();
        $admin->setUsername('admin');
        $admin->setEmail('samuel@wecolearn.com');
        $admin->setRoles(['ROLE_SUPER_ADMIN']);
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
        $admin->addDomain($this->domains[0]);
        $mainDomain = $this->domains[0];
        $mainDomain->addCommunityAdmin($admin);
        $this->manager->persist($mainDomain);
        $admin->setShowProfil(false);
        $admin->setNewMessageNotification(false);
        $admin->setNewMatchNotification(false);
        $admin->setNewMessageEmail(true);
        $admin->setNewMatchEmail(true);
        $admin->setNewsletter(false);
        $this->userManager->updateUser($admin);

        $this->addCommunityAdmins();

        $today = new \DateTime('now', new \DateTimeZone('Europe/Paris'));

        // create the rest of our fixtures and affiliate tags to users
        for ($i = 0; $i < count($firstNames); ++$i) {
            $user = new user();
            $token = new Token();

            $daysAgo = random_int(1, 45);
            $createdDate = new \DateTime("- $daysAgo Days", new \DateTimeZone('Europe/Paris'));


            $user->setCreated($createdDate);
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
            $user->addDomain($this->domains[random_int(0, 2)]);
            $user->setShowProfil(true);
            $user->setLastLogin($today);
            $user->setNewMessageNotification(true);
            $user->setNewMatchNotification(true);
            $user->setNewMessageEmail(true);
            $user->setNewMatchEmail(true);
            $user->setNewsletter(true);
            array_push($userList, $user);

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
            $token->setCreated($today);
            $token->setToken('token'.$i);
            $token->setType(random_int(0, 100));
            $this->manager->persist($token);


            $daysAgo = random_int(1, 45);
            $messageCreatedDate = new \DateTime("- $daysAgo Days", new \DateTimeZone('Europe/Paris'));

            $message = new Message();
            $message->setCreated($messageCreatedDate);
            $message->setIsRead(true);
            $message->setMessage(MessageConstant::$MESSAGES[random_int(0,count(MessageConstant::$MESSAGES)-1)]);
            $message->setSender($user);
            $message->setReceiver($admin);
            $this->manager->persist($message);

            $this->userManager->updateUser($user);
        }

        $this->manager->flush();
    }
}
