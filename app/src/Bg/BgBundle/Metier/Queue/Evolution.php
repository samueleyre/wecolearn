<?php

namespace Bg\BgBundle\Metier\Queue;

use Bg\BgBundle\CEntity\Cache;
use Bg\BgBundle\Model\Evolution as Model;
use AppBundle\Persist\Memcache\Main as Persist;

class Evolution {

	const KEY = 'EVOLUTION';

	private $currentQueuesByClient = [];
	private $persist;
	private $timePerMasse = [];

	public function __construct() {
		$this->persist = new Persist();
		$this->persist->set( self::KEY, []);
	}

	public function addQueue( $idClient , $queue ) {
		$this->currentQueuesByClient[$idClient] = $queue;
		
	}

	public function setResponse() {
		$res = [];

		foreach( $this->idMasse() as $idMasse ) {
			$res[] = $this->evolution($idMasse);
		}
		$ret = $this->persist->set(self::KEY, $res);
	}

	public function idMasse( ) {
		$ret = [];
		foreach( $this->currentQueuesByClient as $idClient => $queue ) {
			foreach( $queue as $value ) {
				foreach( $value as $programmation ) {
					if( $programmation instanceof Cache ) {
						$idMasse = $programmation->fetch()->masse->getId();
						if( false === array_search($idMasse, $ret)) {
							$ret[] = $idMasse;
						}
					}
				}
			}
		}
		return $ret;
	}

	private function elapsed ( $idMasse ) {
		if(!isset($this->timePerMasse[$idMasse])) {
			$this->timePerMasse[$idMasse] = time();
		}
		return time() - $this->timePerMasse[$idMasse]; 
	}

	private function evolution( $idMasse ):Model {
		
		$encounteredProgrammation = 0;
		$lastTic = null;
		$firstTics = null;
		$firstMasse = false;
		$firstEncounteredProgrammations = null;
		$encounteredProgrammation = 0;
		foreach( $this->currentQueuesByClient as $idClient => $queue ) {
			$tics = 0;
			//$encounteredProgrammation = 0;
			foreach( $queue as $value ) {
				$tics ++;
				foreach( $value as $programmation ) {
					if( $programmation instanceof Cache ) {
						$encounteredProgrammation ++;
						if( $programmation->fetch()->masse->getId() === $idMasse ) {
							$lastTic = $tics;
							$lastEencounteredProgrammation = $encounteredProgrammation;
							//$encounteredProgrammation ++;
							if(!$firstMasse) {
								$firstMasse = true;
								$firstTics = $tics;
								$firstEncounteredProgrammations = $encounteredProgrammation;
							}
						}
					}
				}
			}
		}
		$ret = new Model();
		$ret->idMasse = $idMasse;
		$ret->tics = $tics; // nombre de tics la queue du client en cours.
							// donne un évaluation du nombre de passage qu'il reste a faire
							// les tics restant a faire.
		$ret->next = $firstTics;
		$ret->nextProgrammation = $firstEncounteredProgrammations;
		$ret->lastProgrammation = $lastEencounteredProgrammation;
		$ret->last = $lastTic; // le dernier tic pour que la programmation soit réalisée.
		$ret->programmations = $encounteredProgrammation;
		$ret->elapsed = $this->elapsed( $idMasse ); // temps écoulé.

		// remaining = last  + lastProgrammation * progTime.

		return $ret;
	} 
}