<?php

namespace App\Services\User\Service;

use App\Services\Tag\Service\TagService;
use App\Services\User\Entity\User;
use App\Services\Tag\Entity\Tag;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\Types\Integer;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Tests\Test\Constraint\ResponseHeaderSameTest;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class UserService
{
    public $em;
    public $container;
    private $clientId; // for slack
    private $clientSecret; // for slack
//    private $domainService;
    private $securityStorage;
    private $tagService;
    private $logger;

    public function __construct(
        EntityManagerInterface $em,
        ContainerInterface $container,
        //                                 DomainService $domainService,
        $client_id,
        $client_secret,
        TokenStorageInterface $securityStorage,
        TagService $tagService,
        LoggerInterface $logger
    ) {
        $this->em = $em;
        $this->clientId = $container->getParameter('client_id');
        $this->clientSecret = $container->getParameter('client_secret');
//    $this->domainService = $domainService;
        $this->securityStorage = $securityStorage;
        $this->tagService = $tagService;
        $this->logger = $logger;
    }


    public function getAll()
    {
        return $this->em->getRepository(User::class)->findBy(['enabled'=>true], ['created' => 'DESC']);
    }

    public function findById(int $id)
    {
        return $this->em->getRepository(User::class)->find($id);
    }

    public function patch(User $params, $id = null)
    {

        // todo: separate in different methods
        if (null !== $id) {
            $oldUser = $this->findById($id);
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
            'city',
            'tags',
            'showProfil',
            'newMessageNotification',
            'newMatchNotification',
            'newsletter',
        ];

        for ($i = 0; $i < count($parameters); ++$i) {
            $getMethod = 'get'.ucfirst($parameters[$i]);
            $setMethod = 'set'.ucfirst($parameters[$i]);
            if ($params->$getMethod() !== null) {
                $oldUser->$setMethod($params->$getMethod());
            }
        }

        // insert or update new tags in database
        if ($params->getTags()) {
            $oldUser->setTags($this->tagService->beforePatchTags($oldUser->getTags(), $params->getTags()));
        }

        // insert or update "slack" accounts
        //    $oldUser->setSlackAccounts($this->patchSlackAccounts($oldUser, $user->getSlackAccounts()));

        $this->em->persist($oldUser);

        $this->em->flush();

        return $oldUser;
    }

    public function delete(int $id)
    {
        $user = $this->findById($id);
        $user->setDeleted(new \DateTime('now', new \DateTimeZone('Europe/Paris')));
        $this->em->merge($user);
        $this->em->flush();
        return new Response();
    }

    public function post(User $user)
    {
        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }



    // todo: put this in slack service

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



    //  private function insertSlackAccount(SlackAccount $slackAccount) {
//
//    $this->em->persist( $slackAccount );
//    $this->em->flush();
//
//    return $slackAccount;
//
    //  }
}
