<?php

namespace WcBundle\Service;

use WcBundle\Entity\Client;

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


}