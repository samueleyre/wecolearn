<?php

namespace AppBundle\Pagination;

use Symfony\Component\HttpKernel\Event\FilterResponseEvent;

class ResponseListener {

	private $service;
	
	public function __construct(Service $service ) {
		$this->service = $service;
	}

	public function onKernelResponse( FilterResponseEvent $event ) {
		$response = $event->getResponse();

		if( $paginationQuery = $this->service->getPaginationQuery() ) {
			$response->headers->set('X-Pagination', $paginationQuery->getHeader());
			$response->headers->set('Access-Control-Expose-Headers', 'X-Pagination');
			$response->headers->set('Access-Control-Allow-Credentials',true);
			
			/*
			res.setHeader('Access-Control-Allow-Origin', 'http://valor-software.github.io');
  			res.setHeader('Access-Control-Allow-Methods', 'POST');
  			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  			res.setHeader('Access-Control-Allow-Credentials', true);
			*/
		}
		$response->headers->set('Access-Control-Allow-Credentials','true');
		$event->setResponse( $response );
	}
}