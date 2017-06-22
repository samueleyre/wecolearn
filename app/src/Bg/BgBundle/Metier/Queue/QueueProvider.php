<?php

namespace Bg\BgBundle\Metier\Queue;

use Doctrine\ORM\Query\ResultSetMapping;

class QueueProvider {

	protected $queues = [];
	protected $log;
	protected $em;

	public function __construct( $logger, $em ) {
		
		$this->log = $logger;
		$this->em = $em;
		$this->addNewQueues();
		
	}

	protected function getClients() {

		$ret = [];
		$sql = "
		SELECT DISTINCT idClient 
		FROM masse 
		JOIN programmation 
		ON programmation.idMasse = masse.id 
		WHERE used = 0  AND launched = 1 
		GROUP BY idClient";

		$res = 
			$this
				->em
				->createNativeQuery($sql, new ResultSetMapping())
				->getResult()
		;

		foreach($res as $prog) {
			$ret[] = $prog['idClient'];
		}

		return 
			$ret 
		;
	}

	protected function getQueue($idClient) {
		return new Main( $idClient, $this->log );
	}

	protected function addNewQueues() {
		$idClients = $this->getClients();
		foreach( $idClients as $idClient ) {
			if(!array_key_exists($idClient, $this->queues)){
				$this->queues[$idClient] = $this->getQueue($idClient);
			}
		}
	}

	public function tic() {
		$this->addNewQueues();
		$ret = [];
		foreach($this->queues as $idClient => $queue) {
			$ret[$this->getClient($idClient)] = $queue->tic();
		}
		return $ret;
	}

	protected function getClient( $idClient ) {
		
		$sql = sprintf('SELECT name FROM client WHERE id = %d LIMIT 1', $idClient );
		$res = 
			$this
				->em
				->createNativeQuery($sql, new ResultSetMapping())
				->getSingleResult()
		;
		return $res['name'];
	}

	public function __toString() {
		
		
		$tab = [];
		$clients = [];
		foreach( $this->queues as $idClient => $queue ) {
			$clients[] = $idClient;

			//echo 'count ' . $queue->count() . "\n";

			foreach($queue->column() as $pause => $info ) {
				if(!isset($tab[$pause])) {
					$tab[$pause] = [];
				}
				$tab[$pause][$idClient] = $info; 
			}
		}

		foreach($tab as $pause => $infos) {
			foreach($clients as $idClient ) {
				if(!isset($tab[$pause][$idClient])) {
					$tab[$pause][$idClient] = '[populated]';
				}
			}
		}
		
		$ret = '';

		$ret .= 'pause |';
		

		foreach( $clients as $idClient ) {
			$ret .= $this->getClient($idClient) . '|';
		}

		$ret .= "\n";

		foreach ( $tab as $pause => $infos ) {

			$ret .= $pause . '|';
			foreach($infos as $idClient => $info ) {
				$ret .= $info . '|';
			}
			$ret .= "\n";
		}
		
		return $ret;

	}
}