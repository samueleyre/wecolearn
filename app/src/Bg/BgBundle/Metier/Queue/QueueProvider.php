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
		$this->evolution = new Evolution();
		
	}

	protected function getClients() {

		$ret = [];
		$sql = "
		SELECT DISTINCT programmation.idClient 
		FROM BgBundle:Masse masse 
		JOIN BgBundle:Programmation programmation 
		WHERE programmation.used = 0  AND masse.launched = 1 
		GROUP BY programmation.idClient";

		$res = 
			$this
				->em
				->createQuery($sql)
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
		return new Main( $idClient, $this->log , $this->em );
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
			$this->evolution->addQueue( $idClient, $queue->getQueue());
			$tikked = $queue->tic();
			if( isset($tikked) ) $ret[$this->getClient($idClient)] = $tikked;
		}
		$this->evolution->setResponse();
		return $ret;
	}

	protected function getClient( $idClient ) {
		
		$sql = sprintf('SELECT client FROM BgBundle:Client client WHERE client.id = %d ', $idClient );
		$res = 
			$this
				->em
				->createQuery($sql)
				->setMaxResults(1)
				->getSingleResult()
		;
		$name = $res->getName();
		$this->em->detach($res);
		return $name;
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