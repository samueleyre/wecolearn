<?php

namespace Bg\BgBundle\Service;

class ToPhraseService {

	/**
	* @param $array Array[sheet][line][row]
	*/
	public static function toPhrase( Array $array ) {

		$ret = [];
		$i = 0;
		foreach( $array as $sheet ) {
			foreach( $sheet as $row ) {
				$ret[$i] = [];
				foreach($row as $index => $value ) {
					if( preg_match('#http(s):\/\/#', $value )) {
						$ret[$i]['url'] = $value;
						unset($row[$index]);
					}
				}
				if( 2 == count($row)) {
					throw new \LogicException('Url has not been deleted');
				}
				$ret[$i]['phrase'] = $row[0];
				$ret[$i]['id'] = null;
			}
		}
		return $ret;
	}
}