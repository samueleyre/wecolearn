<?php

namespace AppBundle\GoogleSerchApi\Message;

use AppBundle\GoogleSerchApi\Command\FetchResult;
use AppBundle\GoogleSerchApi\Command\FetchSingleResult;


class FetchResultCommandHandler {

	protected $count;
	
	public function __construct( $busCommand ) {

		$this->count = 0;
		$this->busCommand = $busCommand;

	}

	public function handle( FetchResult $command ) {
		new FetchSingleResult( $command->get );
	}
}