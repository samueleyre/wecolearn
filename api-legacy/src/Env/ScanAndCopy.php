<?php

namespace App\Env;

class ScanAndCopy {

	public function __construct() {
		$this->replaceAndCopy = new ReplaceAndCopy();
	}

	public function process($src = '/src/environment') {

			$canedMap = [];
			$this->scanDir($src, $scanedMap);
			$this->copy('/', $scanedMap, $src );



	}

	private function scanDir( $dir, &$path ) {
		foreach(@scandir($dir) as $file ) {
			if( $file !== '.' && $file !== '..') {
				$new = $dir . '/' . $file;
				if(is_dir($new)) {
					$path[$file] = [];
					$this->scanDir($new,$path[$file]);
				} else {
					$path[] = $file;
				}
			}
		}
	}

	private function copy( $path, $map, $source = '/src/environment', $dest = '/src' ) {
		foreach( $map as $fileOrInteger => $arrayOrFile ) {
			if(is_array($arrayOrFile)) {
				$newPath = $path . '/' . $fileOrInteger;
				$this->copy( $newPath, $arrayOrFile );
			} else {
				$this->replaceAndCopy
					->handle(
						$source . $path ,
						$dest .  $path,
						$arrayOrFile
					)
				;
			}
		}
	}
}
