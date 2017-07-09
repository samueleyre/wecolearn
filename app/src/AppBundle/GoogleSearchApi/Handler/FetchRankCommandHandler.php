<?php

namespace AppBundle\GoogleSearchApi\Handler;

use AppBundle\GoogleSearchApi\Message\FetchRank;
use AppBundle\GoogleSearchApi\Model\Response;

use AppBundle\GoogleSearchApi\Service\SearchApi;

class FetchRankCommandHandler {

	protected $count;

	public function __construct($maxPage = 10) {
		$this->service = new SearchApi();
		$this->maxPage = 10;
	}
	
	public function handle( FetchRank $command ) {
		
		$response = new Response();

		$q = $command->getRecherche()->getRecherche();
		$url = $this->replace($command->getRecherche()->getUrl());

		$index = 0;
		$found = false;
		while( $index < $this->maxPage && !$found ) {
			$urls = $this->service->get( $q, $index );
			dump( $urls );
			dump( $url );
			foreach( $urls as $i => $value ) {
				$urls[$i] = $this->replace($value);
			}
			if( false !== $positionInPage = array_search( $url, $urls )) {
				$found = true;
				$response->positionInPage = $positionInPage + 1;
				$response->pageRank = $index + 1;
			} else {
				$index ++;
				//sleep(1);
				//sleep( rand(1,10));
			}
		}
		$command->setResponse( $response );
	}

	private function replace( $string ) {
		return preg_replace('/(\/)$/', '', $string );
	}


}