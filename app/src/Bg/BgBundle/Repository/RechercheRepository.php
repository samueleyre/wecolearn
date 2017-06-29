<?php

namespace Bg\BgBundle\Repository;

class RechercheRepository {

	public function __construct( $em ) {
		
		$this->em = $em;
	
	}

	public function get( ) {
		
		$query = sprintf("
			SELECT recherche	
			FROM BgBundle:Recherche recherche
			LEFT JOIN  BgBundle:Resultat resultat
			WITH resultat.recherche = recherche
		");

		$ret = 
			$this
				->em
				->createQuery( $query )
				->getResult()
		;
		return $ret;
	}
}