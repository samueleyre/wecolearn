<?php

namespace Bg\BgBundle\Metier\Recherche\Service;

use Symfony\Component\Process\Process;
//use Symfony\Component\Process\Exception\ProcessFailedException;


class At {

	public function __construct( $channel = 'r') {
		$this->channel = $channel;
	}

	public function postPone( $timestamp, $file ) {

		$minutes =  ceil ( ( $timestamp - time() ) / 60 );
		$option = $this->channel?sprintf('-q %s', $this->channel):'';
		$command = sprintf('at %s now + %s minutes -f %s',$option,$minutes,$file);
		
		exec( $command );
		//$process = new Process( $command );
		//$process->run();

	}

	public function isScheduled() {

		$option = '';
		if( $this->channel ) {
			$option = sprintf(' -q %s',$this->channel);
		}
		$command = sprintf('atq%s', $option);
		$process = new Process($command);
		$process->start();

		$has = false;

		foreach ($process as $type => $data) {
		    
		    if ( Process::OUT === $type) {
		        
		        $has = true;

		    }
		}

		return $has;

	}

}