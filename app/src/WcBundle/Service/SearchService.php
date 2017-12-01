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


   public function search(Client $client, $filter) {

	    $tag = null;
        $latitude = null;
        $longitude = null;
	    if ($filter !== []) {
	        if (array_key_exists ("tag", $filter) ){
	            $tagName = $filter["tag"];
	            $tag = $this->em->getRepository(Tag::class)
                    ->findOneBy(["name"=>$tagName]);
            }
            if (array_key_exists ("latitude", $filter) && array_key_exists ("longitude", $filter) ){
	            $latitude = $filter["latitude"];
	            $longitude = $filter["longitude"];
            }
        }


        if ($tag === null) {
            return $this->em
                ->getRepository(Client::class)
                ->findMatches($client, $latitude, $longitude);
        } else {

           return $this->em
               ->getRepository(Client::class)
               ->search($tag, $client, $latitude, $longitude);
        }


   }
}