<?php

namespace AppBundle\Pagination;

use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\HttpKernel;
use Symfony\Component\HttpKernel\HttpKernelInterface;

use AppBundle\Pagination\Service;
use AppBundle\Pagination\PaginationQuery;

class RequestListener {

	private $service;
	
	public function __construct( Service $paginationService ) {
		$this->service = $paginationService;
	}

	public function onKernelRequest(GetResponseEvent $event)
    {
        /*
        if (!$event->isMasterRequest()) {
            return;
        }
        */

        $request = $event->getRequest();
        if( $paginationHeader = $request->headers->get('X-Pagination')) {
			
			if(	preg_match('#page=([0-9]*?) perPage=([0-9]+?)$#', $paginationHeader, $match)) {
				$this->service->setPaginationQuery(new PaginationQuery($match[1], $match[2]));
        	} else {
        		$this->service->setPaginationQuery(new PaginationQuery(1, 10));
        	}
        } else {

        	syslog(LOG_ERR, 'no pagiation header');
        }

        
    }
}
