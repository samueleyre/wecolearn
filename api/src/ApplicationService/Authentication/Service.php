<?php

namespace ApplicationService\Authentication;

use ApplicationService\Entities\{User, Token};


class Service {
	
	public function __construct( $hashService , $respositories, $tokenService ) {

		$this->hashService = $hashService;
		$this->respositories = $repositories;
		$this->tokenService = $tokenService;
	
	}

	public function autenticate( User $user ) {

		$user = $this->repositories->fetchOne( $user );

		$ret = ['success' => false ];
		
		if( $user instanceof User ) {

			$hash = $this->hashService->hash( $user );
			
			$user->hash = $hash;
			
			$user = $this->repositories->fetchOne( $user );

			if( $user instanceof User ) {

				$user = $this->repositories->fetchOne( $user );

				$token = $this->tokenService->create();

				$user->tokenId = $token->id;

				$this->repositories->persist( $user );

				$ret = ['token' => $token->token,'success' => true ];

			}
		
		}
		return $ret;
	}
}