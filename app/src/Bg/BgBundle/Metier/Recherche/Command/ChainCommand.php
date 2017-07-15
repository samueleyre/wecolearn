<?php

namespace Bg\BgBundle\Metier\Recherche\Command;

use Bg\BgBundle\Metier\Recherche\Service\WaitFor;

abstract class ChainCommand {

	protected $nextCommand;
	protected $param;
	protected $waitFor = null;
	public $continue = true;

	public function __construct( $param = null ) {
		if( isset( $param ) ) {
			// si on lui passe un paramètre, c'est bien que l'on continue.
			$this->param = $param;
		}
	}
	
	public function continue()  {
		if( isset( $this->waitFor ) ) {
			// si je defini pas de next command, next command vaut l'instance de waitFor.
			// écrire un test.
			( new WaitFor( $this, $this->waitFor ) )->wait();
			return false;
		}
		return $this->continue;
	}

	public function waitFor($waitFor) {
		$this->waitFor = $waitFor;
	}

	public function fetchParam() {
		return $this->param;
	}

	public function setParam( $param ) {
		$this->param = $param;
	} 

	public function setNextCommand(ChainCommand $nextCommand ) : void {
		$this->nextCommand = $nextCommand;
	}

	public function nextCommand(): ChainCommand {
		return $this->nextCommand;
	}
}