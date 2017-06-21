<?php

namespace Bg\BgBundle\Repository;

class ClientRepository {

	public function __construct( $em ) {
		
		$this->em = $em;
	
	}

	public function fetchClientsAvecClefs() {
		
		$query = "
			SELECT client, COUNT( clef.id )	
			FROM BgBundle:Client client 
			JOIN BgBundle:Clef clef
			WITH clef.idClient = client.id
			GROUP BY client.id
		";

		$ret = 
			$this
				->em
				->createQuery( $query )
				->getResult()
		;
		return $ret;
	}
}