<?php

namespace Bg\BgBundle\Metier\Notification;

use AppBundle\Env\Manager as Env;
use AppBundle\Messenger\Manager as Messenger;

class Manager {

	const INFO_LEVEL = 0;
	const RELAUNCH_LEVEL = 1;

	public function __construct( $logger, $messenger ) {
		$this->logger = $logger;
        $this->messenger = $messenger;
	}

	public function info($exception) {
    	$this->send( $exception, self::INFO_LEVEL);
    }

    public function relaunch($exception) {
    	$this->send( $exception, self::RELAUNCH_LEVEL);
    }


	protected function send ( $exception, $level ) {

		$reciptents = [  'edouard.touraille@gmail.com' => 'Edouard Touraille'  ];
        if( $level == self::RELAUNCH_LEVEL && Env::getEnv() == Env::PRODUCTION) {
        	$recipients['jc.ambrieu@gmail.com'] = 'Jean-Claude Ambrieu';
        }
        $from = ['xyz' => 'do-not-respond@ns3003372.ip-5-196-75.eu'];

        $subject = sprintf( '[Blog Generator] exception at %s', (new \Datetime())->format('Y-m-d H:i:s') ); 

        $message = '';

        if( $level == self::RELAUNCH_LEVEL) {
        	$message .= $this->relaunchMessage();
        }
        $message .= $this->infoMessage($exception);

        $this->logger->info( $message );
        
        if( Env::getEnv() >= Env::STAGING ) {

        	
            $message = $this->messenger->getMessage();
            $message->setTo( $recipients);
            $message->setFrom( $from );
            $message->setContent( $message );
            $message->setSubject( $subject );

            $this->messenger->addMessage( $message );
            $this->messenger->flush();

            $this->logger->info('message send');
        }
    }


    protected function infoMessage ( $e ) {
        $exceptionMessage = $e->getMessage();
        $trace = $e->getTraceAsString();
        $class = get_class($e);
        $date = date('d-M-Y H:i:s');
        $message = "<p>Une exception de la classe ${class} est survenue le ${date}</p>\n" .
            "<p>avec le message ${exceptionMessage} et la trace :\n</p>" . 
            "<p>${trace}</p>\n";
       

    }

	protected function relaunchMessage() {

		$url = 'http://xyzxyzxyzxyzxyzxyz.com';

		$url = sprintf('<a href="%s">%s</a>', $url,$url);
		$message = sprintf("<h3>Une exception bloquante est survenue sur le %s</h3>\n<h4>Merci de relancer la programmation</h4>\n", $url);

		return $message;

	}
}