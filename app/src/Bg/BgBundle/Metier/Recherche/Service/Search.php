<?php

namespace Bg\BgBundle\Metier\Recherche\Service;

use Doctrine\ORM\Query\ResultSetMappingBuilder;

use AppBundle\Entity\Proxy;
use Bg\BgBundle\Entity\Recherche;
use Bg\BgBundle\Entity\Resultat; 

use Bg\BgBundle\Metier\Recherche\Exception\NoSearchException;
use AppBundle\GoogleSearchApi\Exception\BlackListException;

use AppBundle\GoogleSearchApi\Service\SearchApi;

class Search {

	public function __construct( $em ) {
		$this->em = $em;
	}

	public function process(Proxy $proxy ) {
		$search = null;
		try {
			$search = $this->getNextSearch();
		} catch(\Exception $e) {
			throw new NoSearchException();
		}

		$recherche->setUseTime(time());
		$this->em->merge( $recherche);
		$this->em->flush();
		$url = $search->getUrl();
		$recherche = $search->getRecherche();

		$sevice = new SearchApi( $proxy );
		$rank = $serice->match( $url, $recherche);

		$search = $this->fetchRechercheResultat( $search );

		$resultat = new Resultat();
		$resultat->setRank( $rank , SearchApi::GOOGLE_RESULT_PER_PAGE );

		$this->em->persist( $result);
		$this->em->flush();





	}

	private function getNextSearch(): Recherche {
		
		$rsm = new ResultSetMappingBuilder( $this->em );
		$rsm->addRootEntityFromClassMetadata(get_class($entity =  new Recherche ), 'search');

		$table = $this->em->getClassMetadata(get_class($entity))->getTableName();

		// cette requête permet d'avoir la plus ancienne recheche.
		$query = sprintf(
			"SELECT *
  			 FROM %s search
  			 ORDER BY search.useTime IS NULL ASC, 
  			 search.useTime ASC,
  			 LIMIT 1  
			", $table );

		$query = $this->em->createNativeQuery($query, $rsm);

		return $query->getSingleResult();
	
	} 

	private function fetchRechercheResultat(Recherche $recherche ) {
		$query = "
			SELECT recherche 
			FROM BgBundle:Recherche recherche
			LEFT JOIN BgBundle:Resultat resultat
			WITH resultat.recherche = recherche
			WHERE recherche.id = :id
		"

		return 
			$this
				->em
				->createQuery( $query )
				->setParameter(':id', $recherche->getId())
				->getResult()
			;
	}
}