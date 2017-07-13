<?php

namespace AppBundle\Logger;

use Monolog\Handler\StreamHandler;

class StdOut extends \Monolog\Logger {

	public function __construct() {
		
		parent::__construct('std.out');
		
		$this->pushHandler(new StreamHandler('php://stdout', Logger::INFO)); 
	
	}
}