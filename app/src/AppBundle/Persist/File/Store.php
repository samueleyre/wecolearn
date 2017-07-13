<?php

namespace AppBundle\Persist\File;

class Store {

	private $dir;
	private $file;

	public function __construct( $dir, $file ) {
		$this->dir = $dir;
		$this->file = $file;
	}

	public function get() {
		return file_get_contents( $this->dir . '/' . $this->file);
	}

	public function put( $data ) {
		file_put_contents( $this->dir . '/' . $this->file, $data);	
	}

}