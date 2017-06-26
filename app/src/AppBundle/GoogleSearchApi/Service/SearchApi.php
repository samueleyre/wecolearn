<?php

namespace AppBundle\GoogleSearchApi\Service;

class SearchApi {

	public function __construct() {
		$this->curl = new \Curl\Curl();
		$this->key = 'AIzaSyDgLGetGChNxVyLjLlnNbLfftSAamPJPb0';
		$this->url= 'https://www.google.fr/search?q=toto&oq=toto&aqs=chrome..69i57j0l5.4760j0j9&sourceid=chrome&ie=UTF-8';
		//?fields=kind,items(title,characteristics/length)	
	}

	public function get( ) {
		$search = "John Scodt";
		$this->curl->get($this->url 
			/*
			,[
			'q' => 'hello john scodt',
			'key' => $this->key,
			'cx' => '006165896850956203093:gi0iupelq9w'
			]*/
		);

		//if( $this->curl->error ) {
			//return $this->curl->error_message;
		//} else {
			return $this->curl->response;
		//}

	
	}
}