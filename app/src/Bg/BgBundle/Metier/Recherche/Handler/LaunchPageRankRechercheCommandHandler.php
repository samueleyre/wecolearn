<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Model\Recherche; 
use AppBundle\GoogleSearchApi\Message\FetchRank;
use Bg\BgBundle\Entity\Resultat;

use Bg\BgBundle\Metier\Recherche\Command\LaunchPageRankRecherche;

class LaunchPageRankRechercheCommandHandler {

	public function __construct( $em, $fetchRankHandler ) {
		$this->em = $em;
		$this->handler = $fetchRankHandler;
	}

	public function handle( LaunchPageRankRecherche $command ) {
		foreach( $this->fetchMessages() as $recherche => $value ) {
			$message = 	$value['message'];
			$this->handler->handle( $message );
			dump($message);
			$resultat = $this->getResultatFromResponse($message->getResponse());
			$recherche = $value['entity'];
			$resultat->setRecherche($recherche);
			$this->em->merge( $recherche);
			$this->em->flush();
		}
	}



	private function fetchRecherches() {
		$query = "
			SELECT recherche FROM 
			BgBundle:Recherche recherche
			LEFT JOIN BgBundle:Resultat resultat
			WITH resultat.recherche = recherche ";	
		
		return 
			$this
				->em
				->createQuery( $query)
				->getResult()
		;
	}

	private function fetchModels() {

		$ret = [];
		foreach($this->fetchRecherches() as $entity ) {
			$model = new Recherche();
			$model->url = $entity->url;
			$model->recherche = $entity->recherche;
			$ret[] = ['entity' => $entity, 'model' => $model ];
		}
		return $ret;
	}

	private function fetchMessages() {
		$ret = [];
		foreach( $this->fetchModels() as $value ) {
			$message = new FetchRank( $value['model'] );
			$ret[] = ['entity' => $value['entity'], 'message' => $message];
		}
		return $ret;
	}

	private function getResultatFromResponse( $response ) {
		$resultat = new Resultat();
		$resultat->date = new \Datetime();
		$resultat->page = $response->pageRank;
		$resultat->rank = $response->positionInPage;
		return $resultat;
	}
}