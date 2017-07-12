<?php

namespace Bg\BgBundle\Metier\Recherche\Command;

class InitCommand extends ChainCommand {

	public $continue = true;

	public function nextCommand() {
		return new FetchProxyCommand();
	}
}