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
		}
		$event->setResponse( $response );
	}
}