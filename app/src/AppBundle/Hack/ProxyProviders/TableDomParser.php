<?php

namespace AppBundle\Hack\ProxyProviders;

use Goutte\Client;
use AppBundle\Entity\Proxy;

class TableDomParser {

	
	protected $nodes = [];
	protected $elements = [];

	public function __construct( 
			$url = 'http://www.aliveproxy.com/fr-proxy-list', 
			//$selector = 'table.cm > tr.cw-list > td',
			$selector = 'table.cm tr td', 
			$rowSize = 10 , 
			$usefullElements = [ 0 ],
			$ignore = 0
		) 
	{

		$this->client = new Client();
		$this->url = $url;
		$this->selector = $selector;
		$this->rowSize = $rowSize;
		$this->usefullElements = $usefullElements;
		$this->ignore = $ignore;
		$this->_elements();
	}

	public function getElements() {
		return $this->elements;
	}
	
	private function _elements() {

		$ret = [];
		
		$crawler = $this->client->request('GET', $this->url );

		$index = 0;
		
		$crawler->filter($this->selector)->each( function ( $node ) use( &$index ) {
			 	
			 	$column =  $index % $this->rowSize; // starting a zéro
			 	$row = (int) floor($index / $this->rowSize); // starting at zero
			 	$index ++;
			 	$this->addElement ( $node->getNode(0), $row, $column );
		});
	}

	private function addElement( $nodeElement , $row, $column ) {
		if ( ( false !== $index = array_search($column, $this->usefullElements ) ) && $row !== $this->ignore ) {
			$this->elements[ $row -$this->ignore ][] = $nodeElement;
		}	
	}
}