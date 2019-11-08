<?php

namespace App\Services\User\Service;

use App\Services\User\Entity\User;
use Doctrine\Common\Collections\Collection;
use App\Services\Tag\Entity\Tag;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UserService
{
    public $em;
    public $container;
    private $clientId; // for slack
    private $clientSecret; // for slack
//    private $domainService;
    private $securityStorage;

    public function __construct(
        EntityManagerInterface $em,
        ContainerInterface $container,
        //                                 DomainService $domainService,
        $client_id,
        $client_secret,
        TokenStorageInterface $securityStorage
    ) {
        $this->em = $em;
        $this->clientId = $container->getParameter('client_id');
        $this->clientSecret = $container->getParameter('client_secret');
//    $this->domainService = $domainService;
        $this->securityStorage = $securityStorage;
    }

    //  function getSlackUserData($code, $redirectURI)
    //  {
//
//    $url = "https://slack.com/api/oauth.access";
//
//    $data["client_id"] = $this->clientId;
//    $data["client_secret"] = $this->clientSecret;
//    $data["code"] = $code;
//    $data["redirect_uri"] = $redirectURI;
//    $url = sprintf("%s?%s", $url, http_build_query($data));
//
//    $response = Unirest\Request::get($url);
//
//    return $response;
    //  }

    public function patch(User $user, $id = null)
    {
        if (null !== $id) { // because used before connection
            $oldUser = $this->em->getRepository(User::class)->findOneBy(['id' => $id]);
        } else {
            // we get it from security storage to avoid modifying other clients
            $oldUser = $this->securityStorage->getToken()->getUser();
        }

        $parameters = [
            'emailConfirmed',
            'firstName',
            'lastName',
            'profilUrl',
            'biographie',
            'intensity',
            'latitude',
            'longitude',
            'tags',
            'showProfil',
            'emailNotifications',
        ];

        for ($i = 0; $i < count($parameters); ++$i) {
            $getMethod = 'get'.ucfirst($parameters[$i]);
            $setMethod = 'set'.ucfirst($parameters[$i]);
            if ($user->$getMethod()) {
                $oldUser->$setMethod($user->$getMethod());
            }
        }

        //set defaults ( shouldn't be here )
        $oldUser->setEmailNotifications(($user->getEmailNotifications()) ? 1 : 0);
        $oldUser->setShowProfil(($user->getShowProfil()) ? 1 : 0);

        // insert or update new tags in database
        $oldUser->setTags($this->patchTags($oldUser->getTags(), $user->getTags()));

        // insert or update "slack" accounts
        //    $oldUser->setSlackAccounts($this->patchSlackAccounts($oldUser, $user->getSlackAccounts()));

        $this->em->merge($oldUser);

        $this->em->flush();

        return $oldUser;
    }

    public function patchTags(Collection $oldUserTags, Collection $tags)
    {
        for ($i = 0; $i < count($tags); ++$i) {
            $oldTag = $this->em
                ->getRepository(Tag::class)
                ->findOneBy(['name' => $tags[$i]->getName(), 'type' => $tags[$i]->getType()]);

            if ($oldTag) {
                if (!$oldUserTags->contains($oldTag)) {
                    $this->addIterationTag($oldTag);
                }
                // if tag already exists, we get the old one and replace it in the persisted variable
                $tags[$i] = $oldTag;
            } else {
                $this->insertNewTag($tags[$i]);
            }

            if (!$oldUserTags->contains($tags[$i])) {
                $oldUserTags->add($tags[$i]);
            }
        }

        return $oldUserTags;
    }

    //  private function patchSlackAccounts(User $oldUser, Collection $slackAccounts)
    //  {
//
//    $oldSlackAccounts = $oldUser->getSlackAccounts();
//
//    for( $i = 0; $i < count($slackAccounts); $i++ ) {
//
//      $slackTeam = $this->em
//        ->getRepository(SlackTeam::class)
//        ->findOneBy(["teamId"=>$slackAccounts[$i]->getSlackTeam()->getTeamId(), "type"=>$slackAccounts[$i]->getSlackTeam()->getType()]);
//
//      if ($slackTeam) {
//
//        $slackAccounts[$i] = $this->patchSlackAccount($slackAccounts[$i], $slackTeam, $oldUser);
//
//      } else {
//
//        $slackAccounts[$i] = $this->patchSlackAccount($slackAccounts[$i], null, $oldUser);
//
//      }
//
//      if (!$oldSlackAccounts->contains($slackAccounts[$i])) {
//        $oldSlackAccounts->add($slackAccounts[$i]);
//      }
//
//
//    }
//
//    return $oldSlackAccounts;
//
//
    //  }

    //  private function patchSlackAccount(SlackAccount $slackAccount, $slackTeam, User $user) {
//
//    $oldSlackAccount = $this->em
//    ->getRepository(SlackAccount::class)
//    ->findOneBy(["accountId"=>$slackAccount->getAccountId(), "slackTeam"=>$slackTeam]);
//
//    if ($oldSlackAccount ) {
//
//    return $oldSlackAccount;
//
//    } else {
//
//      // insert new slackaccount :
//      if(null !== $slackTeam) {
//        $slackAccount->setSlackTeam($slackTeam);
//      }
//
//      $slackAccount->setUser($user); // as it is not configured in post !
//
//      return $slackAccount;
//
//    }
//
//
    //  }

    private function insertNewTag(Tag &$tag)
    {
        try {
            $date = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
        } catch (\Exception $e) {
        }
        $tag->setIteration(1);

        $tag->setCreated($date);
    }

    //  private function insertSlackAccount(SlackAccount $slackAccount) {
//
//    $this->em->persist( $slackAccount );
//    $this->em->flush();
//
//    return $slackAccount;
//
    //  }

    private function addIterationTag(Tag &$tag)
    {
        $tag->setIteration($tag->getIteration() + 1);
    }

    public function delete(User $user)
    {
        $this->em->remove($user);
        $this->em->flush();
    }

    public function post(User $user)
    {
        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }
}
