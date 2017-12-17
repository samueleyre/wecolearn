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



        if ( is_array( $filter) ) {
            if (array_key_exists ("tag", $filter) ){
                $tagName = $filter["tag"];
                $tag = $this->em->getRepository(Tag::class)
                    ->findOneBy(["name"=>$tagName]);

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


        if ($tag === null) { // todo: add case when not connected and search for no tags
            return $this->em
                ->getRepository(Client::class)
                ->findMatches($client, $first, $max, $latitude, $longitude);
        } else {

            return $this->em
               ->getRepository(Client::class)
               ->search($tag, $first, $max, $client, $latitude, $longitude);

        }
   }
}
