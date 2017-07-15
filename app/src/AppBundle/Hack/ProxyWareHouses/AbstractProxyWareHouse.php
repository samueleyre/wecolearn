<?php

namespace AppBundle\Hack\ProxyWareHouses;

use AppBundle\Entity\Proxy;
use Doctrine\ORM\Query\ResultSetMappingBuilder;
use AppBundle\Hack\ProxyProviders\ProxyProvider;

abstract class AbstractProxyWareHouse implements ProxyWareHouse {

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
			$cond .= sprintf("%s proxy.%s=%s ", $sep, $field, $value );
			$sep = 'AND';
		}

		$query = sprintf(
			"SELECT *
  			 FROM %s
  			 WHERE %s
  			 ORDER BY
  			 proxy.useTime ASC,
  			 proxy.useTime IS NULL ASC,
  			 proxy.downTime ASC,
  			 proxy.googleBlacklistedTime ASC
			 LIMIT 1  
			", $table, $cond );

		$query = $this->em->createNativeQuery($query, $rsm);

		return $query->getSingleResult();
	
	}

	private function insertUpdateProxy( Proxy $proxy ) {
		$query = "
			SELECT COUNT(proxy) 
			FROM AppBundle:Proxy proxy 
			WHERE proxy.host = :host 
			AND proxy.port = :port ";

		$params = [
			':host' => $proxy->getHost(),
			':port' => $proxy->getPort(),
		];
		$count = 
			$this
				->em
				->createQuery($query)
				->setParameters($params)
				->getSingleScalarResult();
		
		if( (int) $count === 0 ) {
			
			$this
				->em
				->persist( $proxy );
			
			$this
				->em
				->flush();

			$this->logger->info(sprintf("Ajout d'un nouveau proxy : %s", $proxy->getHost()));

		}
	} 
}