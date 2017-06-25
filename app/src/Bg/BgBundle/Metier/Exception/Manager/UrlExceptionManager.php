<?php

namespace  Bg\BgBundle\Metier\Exception\Manager;

use \HieuLe\WordpressXmlrpcClient\Exception\NetworkException;

use Bg\BgBundle\Metier\Exception\UninterceptedException;


class UrlExceptionManager {

	protected $exception;
	protected $blogUrl;
	protected $logger;

	const REGEX_VALID_1 = "/(You don't have permission to access this server\.)(.*)(\/\.well-known\/blacklist\/unbl\.do)/s";

	public function __construct( $logger ) {
		$this->logger = $logger;
	}

	public function isValid($exception) {
		return 
			( 1 == preg_match(self::REGEX_VALID_1, $exception->getMessage() ) 
				&& $this->isNetworkException($exception)
			)
		;
	}

	protected function isNetworkException( $exception ) {
		return $exception instanceof NetworkException; 
	}

	public function isException( $exception, $blogUrl, $instance ) {
		if(!$this->isValid( $exception ) ) {
			$this->logger->warning('Not valid Url exception');
			$this->logger->warning( sprintf('Exception message :  %s', $exception->getMessage() ));
			throw new UninterceptedException( $exception->getMessage() );
		
		} else {
			
			$this->logger->info('Valid url exception intercepted, before processing');
			$urlExceptionProcessor = new UrlExceptionProcessor( $this->logger );
			$urlExceptionProcessor
				->process($blogUrl,$instance )
			;
		}	
	}
}