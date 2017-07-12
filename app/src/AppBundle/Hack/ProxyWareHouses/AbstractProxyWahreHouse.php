<?php

namespace AppBundle\Hack\ProxyWareHouses;

use AppBundle\Entity\Proxy;
use Doctrine\ORM\Query\ResultSetMappingBuilder;

abstract class AbstractProxyWhereHouse implements ProxyWahreHouse {

	private $providers = [];
	private $em;
	private $logger;

	public function __construct( $em, $logger ) {
		
		$this->em = $em;
		$this->logger = $logger;
	
	}

	public function addProxyProvider( ProxyProvider $provider ) {
		$this->providers[] = $provider;
	}

	public function populate() {
		foreach( $this->providers as $proxyProvider) {
			foreach( $proxyProvider->getProxies() as $proxy ) {
				$this->insertUpdateProxy( $proxy );
			}
		}
	}

	public function getNextProxy( Array $filters ) {

		$rsm = new ResultSetMappingBuilder( $this->em );
		$rsm->addRootEntityFromClassMetadata(get_class($entity =  new Proxy ), 'proxy');

		$table = $this->em->getClassMetadata(get_class($entity))->getTableName();

		$cond = '';
		$sep = '';
		foreach( $filters as $field => $value ) {
			$cond .= sprintf("%s proxy.%s='%s'", $sep, $field, $value );
			$sep = 'AND';
		}

		$query = sprintf(
			"SELECT *
  			 FROM %s proxy
  			 WHERE %s
  			 ORDER BY proxy.useTime IS NULL ASC, 
  			 proxy.useTime ASC,
  			 proxy.dowTime IS NULL ASC,
  			 proxy.downTime ASC,
  			 proxy.gBlacklistedTime IS NULL ASC,
  			 proxy.gBlacklistedTime ASC
			 LIMIT 1  
			", $table, $cond );

		$query = $this->em->createNativeQuery($query, $rsm);

		return $query->getSingleResult();
	
	}

	private function insertUpdateProxy( Proxy $proxy ) {
		$query = "SELECT proxy FROM AppBundle:Proxy proxy WHERE host = :host AND port = :port";

		$pramas = [
			'host' => $proxy->getHost(),
			'port' => $proxy->getPort(),
		];
		try {
			$this
				->em
				->createQuery($query)
				->setParamters($params)
				->setMaxResults(1)
				->getSingleResult();
		
		} catch( \Exception $e ) {
			
			$this
				->em
				->perist( $em );
			
			$this
				->em
				->flush();

			$this->logger->info(sprintf("Ajout d'un nouveau proxy : %s", $proxy->getHost()));
		}
	} 
}