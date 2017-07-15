<?php

namespace Bg\BgBundle\Metier\Recherche\Service;

use Doctrine\ORM\Query\ResultSetMappingBuilder;

use AppBundle\Entity\Proxy;
use AppBundle\Env\Manager as Env;

use Bg\BgBundle\Entity\Recherche;
use Bg\BgBundle\Entity\Resultat; 

use Bg\BgBundle\Metier\Recherche\Exception\NoSearchException;
use AppBundle\GoogleSearchApi\Exception\BlackListException;

use AppBundle\GoogleSearchApi\Service\SearchApi;

class Search {

	public function __construct( $em, $logger ) {
		$this->em = $em;
		$this->logger = $logger;
	}

	public function process(Proxy $proxy ) {
		$search = null;
		try {
			$search = $this->getNextSearch();
		
		} catch(\Exception $e) {

			throw new NoSearchException();
		
		}

		
		
		$url = $search->getUrl();
		$recherche = $search->getRecherche();

		$this->logger->info(sprintf("Recherche [ url ] : %s , [ name ]: %s", $url,$recherche));

		$service = new SearchApi( $proxy , $this->logger );

		$maxPage = Env::getEnv() === Env::PRODUCTION?10:3;
        
        $rank = $service->match( $url, $recherche , $maxPage );

		$this->logger->info("La recherche est validée");
		$search->setUseTime(time());
		$this->em->merge( $search);
		$this->em->flush();
		

		$this->logger->info(sprintf("Rank de la recherche : %s", $rank ));

		$search = $this->fetchRechercheResultat( $search );

		$resultat = new Resultat();
		$resultat->setRank( $rank , SearchApi::GOOGLE_RESULT_PER_PAGE );
		$resultat->setRecherche( $search );

		$this->em->persist( $resultat );
		$this->em->flush();

	}

	private function getNextSearch(): Recherche {
		
		$rsm = new ResultSetMappingBuilder( $this->em );
		$rsm->addRootEntityFromClassMetadata(get_class($entity =  new Recherche ), 'search');

		$table = $this->em->getClassMetadata(get_class($entity))->getTableName();

		// cette requête permet d'avoir la plus ancienne recheche.
		$query = sprintf(
			"SELECT *
  			 FROM %s as search
  			 ORDER BY
  			 search.useTime ASC,
  			 search.useTime IS NULL ASC 
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
		";

		return 
			$this
				->em
				->createQuery( $query )
				->setParameter(':id', $recherche->getId())
				->getResult()[0]
			;
	}
}