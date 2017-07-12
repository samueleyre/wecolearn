<?php

namespace Bg\BgBundle\Metier\Recherche\Command;

use Bg\BgBundle\Metier\Recherche\Service\WaitFor;

abstract class ChainCommand {

	protected $nextCommand;
	protected $param;
	protected $waitFor = null;
	public $continue = false;

	public function __construct( $param = null ) {
		if( isset( $param ) ) {
			// si on lui passe un paramètre, c'est bien que l'on continue.
			$this->continue = true;
			$this->param = $param;
		}
	}
	
	public function continue() : boolean {
		if(isset($this->waitFor)) sleep( (new WaitFor($this->waitFor))->second());
		return $this->continue;
	}

	public function waitFor($waitFor) {
		$this->continue = true;
		$this->waitFor = $waitFor;
	}

	public function param() {
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