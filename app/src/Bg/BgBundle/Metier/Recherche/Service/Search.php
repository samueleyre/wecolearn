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

	private $previousSearchId = null;

	public function __construct( $em, $logger ) {
		$this->em = $em;
		$this->logger = $logger;
	}

	public function process(Proxy $proxy ) {
		$search = null;
		$isNew = false;
		try {
			$search = $this->getNextSearch();
			$isNew = $this->previousSearchId == $search->getId();
			$this->previousSearchId = $search->getId();
		
		} catch(\Exception $e) {

			dump($e->getMessage());
			exit();
			throw new NoSearchException();
		
		}

		
		
		$url = $search->getUrl();
		$recherche = $search->getRecherche();
		$resultat = isset($search->getResultats()[0])?$search->getResultats()[0]:null;

		$searchPage = 0;
		if( $resultat instanceof Resultat ) {
			$searchPage = null!==$resultat->getSearchPage()?$resultat->getSearchPage():0;
		}

		$this->logger->info(sprintf("Recherche [ url ] : %s , [ name ]: %s", $url,$recherche));

		$service = new SearchApi( $proxy , $this->logger );

		$maxPage = Env::getEnv() === Env::PRODUCTION?10:3;
        
        // trow connect or blacklist exception.
        try {
        	
        	$rank = $service->match( $url, $recherche , $maxPage , $searchPage );

        } catch( \Exception $e ) {

        	$searchPage = $e->getRank();
        	if ( $resultat instanceof Resultat ) {
        		$this->logger->info('Resultat is INSTANCE');
        		$resultat->setSearchPage( $searchPage );
        		$this->em->merge( $resultat);
        	} else {
        		$this->logger->info('Resultat is CREATED');
        		$resultat = new Resultat();
        		$resultat->setSearchPage( $searchPage );
        		$resultat->setRecherche($search);
        		$this->em->persist( $resultat);
        	}
        	$this->em->flush();
        	throw new $e;
        }

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

		return $isNew;

	}

	private function getNextSearch(): Recherche {
		
		$query = "SELECT recherche 
			FROM BgBundle:Recherche recherche
			LEFT JOIN BgBundle:Resultat resultat 
			WITH recherche = resultat.recherche 
			AND resultat.searchPage IS NOT NULL
			ORDER BY
			recherche.useTime ASC,
			resultat.date ASC
			";

		$res = $this
			->em
			->createQuery($query)
			->setMaxResults(1)
			->getResult()
			;

		if(count($res) === 0 ) throw new \Exception();

		return $res[0];

		//$rsm = new ResultSetMappingBuilder( $this->em );
		
		/*
		$rsm = new ResultSetMappingBuilder( $this->em ,ResultSetMappingBuilder::COLUMN_RENAMING_CUSTOM);
		$rsm->addRootEntityFromClassMetadata(get_class($entity =  new Recherche ), 'recherche',['id'=>'id_recherche']);
		$resultat = new Resultat();
		
		$rsm->addJoinedEntityFromClassMetadata(get_class($resultat), 'resultat', 'recherche', 'resultats', ['idRecherche' => 'id_recherche']);
		
		
		// cette requête permet d'avoir la plus ancienne recheche.
		$query = sprintf(
			"
			SELECT 
			recherche.id AS id_recherche,
			recherche.name,
			recherche.url,
			recherche.recherche,
			recherche.nextTime,
			recherche.useTime,
			resultat.id,
			resultat.date,
			resultat.rank,
			resultat.page,
			resultat.searchPage
			FROM recherche
			LEFT JOIN resultat 
			ON resultat.idRecherche = recherche.id 
			AND resultat.searchPage IS NOT NULL
			ORDER BY
			recherche.useTime ASC,
			recherche.useTime IS NULL ASC 
			LIMIT 1  
			");

		$query = $this->em->createNativeQuery($query, $rsm);

		try {
			
			$ret = $query->getSingleResult();
			dump( $ret );

		} catch( \Exception $e ) {
			dump( $e->getMessage());
			dump(1);
			exit();
		}

		return $ret;
		*/
	
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