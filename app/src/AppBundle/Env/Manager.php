<?php

namespace AppBundle\Env;

class Manager {

	protected static $allowed = [
		1 => 'dev',
		2 => 'staging',
		3 => 'production'
	]

	const DEV = 1;
	const STAGING = 2;
	const PRODUCTION = 3;


	public static function getEnv() {
		$ret =  array_search(
					getenv('ENV'), 
					self::$allowed
				)
			;

		if ( $ret === false ) $ret = self::DEV;
		return $ret;
	}
}