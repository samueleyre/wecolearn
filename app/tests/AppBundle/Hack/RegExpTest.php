<?php

namespace Tests\AppBundle\Hack;

use PHPUnit\Framework\TestCase;

class RexExpTest extends TestCase {

	public function testExceptionMatch() {
		
		$class = new \Tests\AppBundle\Hack\Exception();
		
		$className = get_class($class);
		$regexp = '/Tests\\\AppBundle\\\Hack/';
		
		$this->assertEquals(preg_match(
					$regexp, 
					$className),
				1 
			)
		;
	}

}

class Exception extends \Exception {

}

