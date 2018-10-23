<?php

namespace WcBundle\Service;

use WcBundle\Entity\Client;
use WcBundle\Entity\Tag;
use \Doctrine\Common\Collections\Collection;
use Unirest;

use Doctrine\ORM\EntityManager;

class ClientService {

	public $em;
	private $clientId;
	private $clientSecret;
	private $domainService;

	public function __construct( EntityManager $em, DomainService $domainService, $client_id, $client_secret ) {
		$this->em = $em;
		$this->clientId = $client_id;
		$this->clientSecret = $client_secret;
		$this->domainService = $domainService;
	}

  function getSlackUserData($code, $redirectURI)
  {

    $url = "https://slack.com/api/oauth.access";

    $data["client_id"] = $this->clientId;
    $data["client_secret"] = $this->clientSecret;
    $data["code"] = $code;
    $data["redirect_uri"] = $redirectURI;
    $url = sprintf("%s?%s", $url, http_build_query($data));

    $response = Unirest\Request::get($url);

    return $response;
  }

  public function generateUrl( Client &$client ) {


      $this->newUrl($client);

      while($this->em->getRepository(Client::class)->findBy(["profilUrl"=> $client->getProfilUrl()])) {
          $this->newUrl($client);
      }

  }

  private function newUrl(Client &$client) {

      $userName = $client->getUser()->getUsername();
      if ($userName  === $client->getProfilUrl()) {
          $userName .= rand(0,9);
      }
    $client->setProfilUrl($userName);

  }


  public function patch(Client $client, $user = null, $addTags = true, $addUser = true)
  {

      $oldClient = $this->em
          ->getRepository(Client::class)
          ->find($client->getId());

      $parameters = [ "firstName", "lastName", "profilUrl", "biographie", "intensity", "atmosphere", "latitude", "longitude", "tags", "showProfil", "emailNotifications" ];

      for ($i=0; $i< count($parameters); $i++) {

          $getMethod = "get".ucfirst($parameters[$i]);
          $setMethod = "set".ucfirst($parameters[$i]);
          if ($client->$getMethod()) {
              $oldClient->$setMethod($client->$getMethod());
          }

      }

      //set defaults ( shouldn't be here )
      $oldClient->setEmailNotifications(($client->getEmailNotifications()) ? 1 : 0);
      $oldClient->setShowProfil(($client->getShowProfil()) ? 1 : 0);

      // insert or update new tags in database
      $oldClient->setTags($this->patchTags($oldClient->getTags(), $client->getTags()));


      $this->em->merge( $oldClient );

      $this->em->flush();

      return $oldClient;

  }


  private function patchTags(Collection $oldClientTags, Collection $tags)
  {

      for( $i = 0; $i < count($tags); $i++ ) {

          $oldTag = $this->em
              ->getRepository(Tag::class)
              ->findOneBy(["name"=>$tags[$i]->getName(), "type"=>$tags[$i]->getType()]);


          if ($oldTag ) {

              if (!$oldClientTags->contains($oldTag)) {
                  $this->addIterationTag($oldTag);
              }
              $tags[$i] = $oldTag;


          } else {

              $this->insertNewTag($tags[$i]);

          }

          if (!$oldClientTags->contains($tags[$i])) {
              $oldClientTags->add($tags[$i]);

          }


      }

      return $oldClientTags;

  }

  private function insertNewTag(Tag &$tag) {

      $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
      $tag->setIteration(1);

      $tag->setCreated($date);

  }

  private function addIterationTag(Tag &$tag)
  {
      $tag->setIteration($tag->getIteration() + 1);

  }

  public function delete (Client $client) {
    $this->em->remove(  $client );
    $this->em->flush();
  }

  public function post(Client $client) {
    $this->em->persist( $client );
    $this->em->flush();
    return $client;
  }


}
