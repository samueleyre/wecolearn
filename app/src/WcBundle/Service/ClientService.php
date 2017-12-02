<?php

namespace WcBundle\Service;

use WcBundle\Entity\Client;
use WcBundle\Entity\Tag;
use AppBundle\Entity\User;

use Doctrine\ORM\EntityManager;

class ClientService extends GPPDService {

	private $em;

	public function __construct( EntityManager $em ) {
        parent::__construct( $em);
		$this->em = $em;
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

    public function get( $filters = []) {

        syslog(LOG_ERR, 'filter'.count($filters));
        $params = [];
        $condition = '';
        $sep = '';
        $qb = $this->em->createQueryBuilder();
        $qb->select('entity, image.filename');
        $qb->from(sprintf('%s', $this->entityRef ),'entity');

        if(count($filters) > 0 ) {
            foreach( $filters as $field => $value ) {
                $condition = sprintf('%s entity.%s=:%s', $sep , $field, $field);
                $sep = "  ";
                $params[':'.$field] = $value;
            }
            $qb->andWhere( $condition );
            $qb->setParameters( $params);
        }

//        $qb->setMaxResults( 5 );
//        $qb->setFirstResult( 0 );

        $ret = $qb->getQuery()->getResult();

        return  $ret;

    }

    public function find( $filters = []) {

        syslog(LOG_ERR, 'filter'.count($filters));
        $params = [];
        $condition = '';
        $sep = '';
        $qb = $this->em->createQueryBuilder();
        $qb->select('entity, image.filename');
        $qb->from(sprintf('%s', $this->entityRef ),'entity');
        $qb->leftJoin('WcBundle:Image', 'image', 'WITH', 'entity.photoid = image.id');
//        $qb->where('entity.photoid = image.id');
//        return count($filters);
        if(count($filters) > 0 ) {
            foreach( $filters as $field => $value ) {
                $condition = sprintf('%s entity.%s=:%s', $sep , $field, $field);
                $sep = "  ";
                $params[':'.$field] = $value;
            }
            $qb->andWhere( $condition );
            $qb->setParameters( $params);
        }

//        $qb->setMaxResults( 5 );
//        $qb->setFirstResult( 0 );

        $ret = $qb->getQuery()->getResult();

        $this->setClientPhotoname($ret);

        return  $ret;

    }



    private function setClientPhotoname(&$clients)
    {


        for ($i=0; $i< count($clients); $i++) {
            $client = $clients[$i];
            if($client[0]->getPhotoid()) {
                $client[0]->setPhotoname($client['filename']);
            }
            $clients[$i] = $client[0];
        }


    }

    public function patch($client, $user = null, $addTags = true, $addUser = true)
    {


				//return $this->insertNewTags($client->getTags());

        if ( $addTags ) {
            $client->setTags($this->insertNewTags($client->getTags()));
        }

		if( $addUser ) {
            $client->setUser($user);
        }

		if( null === $client->getCreated()) {
			$client->setCreated(new \Datetime());
		}


        $this->em->merge( $client );

        $this->em->flush();

        return $client;

    }

    public function matches($client, $filter = null )
    {

        return $this->em
            ->getRepository(Client::class)
            ->findMatches($client, $filter['first'], $filter['max'] );




    }

    private function insertNewTags($tags)
    {
        for( $i = 0; $i < count($tags); $i++ ) {

            $oldTag = $this->em
                ->getRepository(Tag::class)
                ->findOneBy(["name"=>$tags[$i]->getName(), "type"=>$tags[$i]->getType()]);

            if ($oldTag) {

                $this->addIterationTag($oldTag);

                $tags[$i] = $oldTag;

            } else {
                $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));

                $tags[$i]->setCreated($date);
                $tags[$i]->setIteration(1);

                $tags[$i] = $this->postOne( $tags[$i] );
            }


        }

        return $tags;

    }

    private function addIterationTag( &$tag)
    {
        $tag->setIteration($tag->getIteration() + 1);

        $this->em->merge( $tag);

        $this->em->flush();


    }


}
