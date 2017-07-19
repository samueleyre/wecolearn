<?php

namespace AppBundle\GoogleSearchApi\Exception;

class RankException extends \Exception {

	protected $rank;
	
	public function setRank( $rank ) {
		$this->rank = $rank;
	}

	public function getRank() {
		return $this->rank;
	}
}