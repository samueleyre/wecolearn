<?php

namespace Bg\BgBundle\Metier\Exception\Manager;


use AppBundle\Env\Manager as Env;

class UrlExceptionProcessor {

	protected static $blogs; // taype array of arra [ blog, retry ]

	protected $curl;

	const CURL_ERROR = 1;
	const CURL_OK = 2;

	protected $logger;
	protected $debug;
	protected $maxRetry = 3;





	public function __construct( $logger, $env = 1 ) {
		$this->logger = $logger;
		$this->env = $env;
	}

	
	protected function addRetry( $blogUrl ) {

		if(!is_array(self::$blogs)) {
			self::$blogs = [];
		}

		if(array_key_exists($blogUrl,self::$blogs)) {
			$now = new \Datetime('now');
			if(self::$blogs[$blogUrl]['retryOn']->format('mdY') == $now->format('mdY')) {
				self::$blogs[$blogUrl]['retryToday'] ++;
			} else {
				self::$blogs[$blogUrl]['retryOn'] = $now;
				self::$blogs[$blogUrl]['retryToday'] = 0;
			}
			self::$blogs[$blogUrl]['retryOn'] =  $now;

		} else {
			
			self::$blogs[$blogUrl] = ['retryOn' => new \Datetime('now'),'retryToday'=>0];
		
		}
	}

	protected function canRetry( $blogUrl ) {
		$canRetry = false;
		if(!is_array(self::$blogs) || $this->maxRetry > self::$blogs[$url]['retryToday']) {
			$canRetry = true;
		}
		return 
			$canRetry;
		;
	}

	protected function postWithCurl( $url ) {
		
		$curl = new \Curl\Curl();
		
		$this->logger->info(sprintf("get url on : %s/.well-known/blacklist/unbl.do",$url ) );

		$curl->get($url."/.well-known/blacklist/unbl.do", array(
    		"origin_uri" =>"&#47;xmlrpc.php",
    		"submit"=>"I'm not a bot, let me in",
		));

		if ($curl->error) {
    		$this->logger->warning(sprintf('Curl Error code : %s', $curl->error_code));
    		return 
    			self::CURL_ERROR
    		;
		}
		else {
    		
    		return 
    			self::CURL_OK
    		;
		}
	}

	// nota should be in class dedicated to url treatments.
	protected function removeLastSlash($url) {
		$ret = $url;
		$pos = strrpos($url, '/');
		$length = strlen($url);
		if($pos === ($length - 1)) {
			$ret = substr( $url, 0, $length-1 );
		}
		return 
			$ret
		;
	}

	public function process( $blogUrl , $instance) {
		$blogUrl = $this->removeLastSlash( $blogUrl );
		if($this->canRetry($blogUrl)) {
			$this->addRetry($blogUrl);
			$this->sleep();
			$curlRet = $this->postWithCurl($blogUrl);
			if($curlRet == self::CURL_ERROR) {
				$this->logger->warning('Curl error while trying to process the url exception Form');
				throw new \OP\Exception\UrlProcessorCurlException('Error while processing curl');
			}
			$instance->go();
		
		} else {
			$this->logger->warning('Url exception, curl post max retry reached');
			throw new \OP\Exception\UrlProccessorMaxRetryException('Erro max retry');
		}
	}

	protected function sleep() {
		$sleepTime = rand(60,77);
		if( Env::getEnv() <= ENV::PRODUCTION ) {
			$sleepTime = 2;
		}
		sleep($sleepTime);
	}
}