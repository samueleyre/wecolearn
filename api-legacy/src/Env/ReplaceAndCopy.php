<?php

namespace App\Env;


// This class is used to replace config in the environment files.
class ReplaceAndCopy {

	public function __construct($replacements = '/src/config') {

		$this->envName = Manager::getEnvName();
		$file = Manager::getEnvFile();
		$this->vars = json_decode(file_get_contents($replacements . '/'. $file), true);

	}

	public function handle( $sourceDir, $destDir,  $filename ) {

		// ex : 'file.ext.env';

		$matchedEnv = null;
		foreach( Manager::$allowed as $allowedEnv ) {
			if( preg_match( sprintf('/\.%s$/',$allowedEnv), $filename ) ) {
				$matchedEnv = $allowedEnv;
			}
		}
		if( isset( $matchedEnv) && $this->envName === $matchedEnv ) {
			$dest = preg_replace(sprintf('/\.%s/', $this->envName),'',$filename);
			$this->replaceAndCopy($sourceDir. '/' . $filename, $destDir. '/'. $dest);
		}

		if(!isset( $matchedEnv)) {
			// on replace et copy
			$this->replaceAndCopy($sourceDir. '/' . $filename, $destDir. '/'. $filename);
		}
	}

	private function replaceAndCopy( $file, $dest ) {

		$patterns = [];
		$replacements = [];
		foreach( $this->vars as $name => $value ) {
			$patterns[] = sprintf('/#%s#/', $name );
			$replacements[] = $value;
		}
		$patterns[] = '/\'#production#\'/';
    $replacements[] = ($this->envName === "production") ? "true" : "false";
    file_put_contents($dest, preg_replace($patterns, $replacements, file_get_contents( $file )))
		;
	}
}
