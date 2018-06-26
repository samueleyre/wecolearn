<?php

namespace WcBundle\Service;

use WcBundle\Entity\Client;
use WcBundle\Entity\Tag;
use AppBundle\Entity\User;

use Doctrine\ORM\EntityManager;

class SearchService extends GPPDService {

	private $em;

	public function __construct( EntityManager $em ) {
        parent::__construct( $em);
		$this->em = $em;
	}


   public function search(Client $client = null, $filter = null ) {

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
        }

        if( array_key_exists('first', $filter ) && array_key_exists('max', $filter )) {
            $first = $filter['first'];
            $max = $filter['max'];

        }
      }


      return $this->em
        ->getRepository(Client::class)
        ->search($client, $tag, $first, $max, $latitude, $longitude);

   }
}
