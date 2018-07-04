<?php

namespace WcBundle\Service;

use WcBundle\Entity\Client;
use WcBundle\Entity\Tag;
use AppBundle\Entity\User;
use \Doctrine\Common\Collections\Collection;

use Doctrine\ORM\EntityManager;

class ClientService {

	private $em;

	public function __construct( EntityManager $em ) {
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

//        syslog(LOG_ERR, 'filter'.count($filters));
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

//        syslog(LOG_ERR, 'filter'.count($filters));
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

    public function patch(Client $client, $user = null, $addTags = true, $addUser = true)
    {

        $oldClient = $this->em
            ->getRepository(Client::class)
            ->find($client->getId());

        $parameters = [ "firstName", "lastName", "profilUrl", "biographie", "intensity", "atmosphere", "latitude", "longitude", "tags", "showProfil" ];

        for ($i=0; $i< count($parameters); $i++) {

            $getMethod = "get".ucfirst($parameters[$i]);
            $setMethod = "set".ucfirst($parameters[$i]);
            if ($client->$getMethod()) {
                $oldClient->$setMethod($client->$getMethod());
            }

        }


//        return $oldClient->getTags();
//        return $this->patchTags($oldClient->getTags(), $client->getTags());
        $oldClient->setTags($this->patchTags($oldClient->getTags(), $client->getTags()));

//		if( $addUser ) { // FOR CHANGE OF PASSWORD / EMAIL ADRESS / USERNAME
//            $oldClient->setUser($user);
//        }

//		if( null === $client->getCreated()) { // SHOULD BE USELESS
//			$oldClient->setCreated(new \Datetime());
//		}


//        return $oldClient;

        $this->em->merge( $oldClient );

        $this->em->flush();

        return $oldClient;

    }


    private function patchTags(Collection $oldClientTags, $tags)
    {

//        return $oldClientTags;
        for( $i = 0; $i < count($tags); $i++ ) {

            $oldTag = $this->em
                ->getRepository(Tag::class)
                ->findOneBy(["name"=>$tags[$i]->getName(), "type"=>$tags[$i]->getType()]);
//            return $oldTag;


                if ($oldTag ) {

//                    return $oldTag;
                    if (!$oldClientTags->contains($oldTag)) {
                        $this->addIterationTag($oldTag);
                    }
//                    return $oldTag;
                    $tags[$i] = $oldTag;


                } else {

                    $this->insertNewTag($tags[$i]);
    //                $this->em->persist( $tags[$i] );
    //                $this->em->flush();

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

//        $this->em->persist( $tag );
//        $this->em->flush();

    }

    private function addIterationTag(Tag &$tag)
    {
        $tag->setIteration($tag->getIteration() + 1);

//        return $tag->getIteration();

//        $this->em->merge( $tag);
//
//        $this->em->flush();

//        return $tag;


    }


}
