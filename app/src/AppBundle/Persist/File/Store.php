<?php

namespace AppBundle\Persist\File;

class Store {

	private $path;

	public function __construct( $dir, $file ) {
		$this->dir = $dir;
		$this->file = $file;
		$this->path = $this->dir . '/' . $this->file;
		if(!is_file( $this->path )) {
			$fp = fopen($this->path, 'w+');
			fclose( $fp );
		}
	}

	public function get() {
		return file_get_contents($this->path);
	}

	public function put( $data ) {
		file_put_contents( $this->path , $data);	
	}

}