<?php

namespace WcBundle\Service;

use WcBundle\Entity\Tag;
use WcBundle\Entity\User;

use Doctrine\ORM\EntityManager;

class SearchService extends GPPDService {

	private $em;

	public function __construct( EntityManager $em) {
        parent::__construct( $em);
		$this->em = $em;
	}


   public function search(User $user = null, $filter = null, $domain = "wecolearn" ) {

      $tag = null;
      $latitude = null;
      $longitude = null;
      $first = 0;
      $max = 10;
      $tagType = 0;


      if ( is_array( $filter) ) {
        if (array_key_exists ("tag", $filter) ){
            $tagName = $filter["tag"];
            $tag = $this->em->getRepository(Tag::class)
                ->findOneBy(["name"=>$tagName, "type"=>$tagType]);

        }
        if (array_key_exists ("latitude", $filter) && array_key_exists ("longitude", $filter) ){
            $latitude = $filter["latitude"];
            $longitude = $filter["longitude"];
        } else {
          $latitude = ($user && null !== $user->getLatitude()) ? $user->getLatitude() : 45.75;
          $longitude = ($user && null !== $user->getLongitude()) ? $user->getLongitude() : 4.85;
        }

        if( array_key_exists('first', $filter ) && array_key_exists('max', $filter )) {
            $first = $filter['first'];
            $max = $filter['max'];

        }
      }

      $result =  $this->em
      ->getRepository(User::class)
      ->search($user, $tag, $first, $max, $latitude, $longitude, false, $domain);

     // todo: search for type 0, if less than 5, search for other types.

     if ($result === [] ) {
        $result = $this->em
          ->getRepository(User::class)
          ->search($user, $tag, $first, $max, $latitude, $longitude, true, $domain);
     }

     return $result;

   }
}
