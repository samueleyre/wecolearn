<?php

namespace ApplicationService\Token;

use ApplicationService\Entities\Token;

use Rhumsaa\Uuid\Uuid;


class Service {

	public function __construct( $entityManager, $expirationPeriodeInMinutes = 60*24 ) {
		$this->em = $entityManager;
		$this->expirationPeriode = $expirationPeriodeInMinutes;
	}

	public function get() {
		return $this->create();
	}

	private function create() {
		$token = new Token();
		$token->token = $this->hash();
		$token->expirationDate = $this->expirationDate();
		$this->em->persist( $token );
		$this->em->flush();
		return $token;
	}

	public function isValid( Token $token ) {
		if(! $token->expirationDate instanceof \Datetime || !isset($token->id)) {
			$token = $this->em->fetchOne( $token );
		}
		if(!isset($token->id)) {
			return false;
		}
		if($token->expirationDate >= new \Datetime()) {
			return false;
		}
		return true;

	}

	public function clean() {
		$tokens = $this->em->fetch(new Token());
		$flush = false;
		foreach( $tokens as $token ) {
			if(!$this->isValid( $token )) {
				$this->em->remove($token);
				$flush = true;
			} 
		}
		if( $flush ) {
			$this->em->flush();
		}
	}

	private function hash() {
		return Uuid::uuid1();
	}

	private function expirationDate() {
		return new DateTime(date("c", time() + $this->expirationPeriode * 60 ));
	}


}