<?php

namespace ApplicationService\Hash;

use ApplicationService\Entities\User;

class Service {

	public function __construct($cost=10) {
		$this->cost = $cost;
	}

	public function hash( User $user ) {

		if( isset( $user->id ) && isset($user->password) ) {
			return password_hash(
					$user->password, 
					PASSWORD_DEFAULT, 
					[
						'salt' => $this->salt($user->id),
						'cost' => $this->cost;
					]);
		} else {
			throw new \LogicException("Debug : soit le mot de passe soit l'id de l'utilisateur n'est pas défini");
			// todo trop compliqué d'exprimer neither or : 
		}
	}

	public function verify( User $user, $password ) {
		if(isset($user->hash)) {
			return password_verify($password, $user->hash);
		} else {
			throw new \LogicException("L'entité user n'a pas de hash");
		}
	}

	private function salt( $string ) {
		return md5( $string );
	}
}