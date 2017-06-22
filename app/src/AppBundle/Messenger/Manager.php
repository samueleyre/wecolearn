<?php

namespace AppBundle\Messenger;

class Manager {

	public function __construct() {
		$this->messages = [];
		// Create the Transport
		$this->transport = (new \Swift_SmtpTransport('localhost', 25))
  			//->setUsername('your username')
  			//->setPassword('your password')
		;

		// Create the Mailer using your created Transport
		$this->mailer = new \Swift_Mailer( $this->transport );
	}

	public function getMessage() {
		return new Message();
	}

	public function addMessage( Message $message ) {
		$this->messages[] = $message;
	}

	public function flush() {
		foreach( $this->messages as $message ) {
			$this->mailer->send($message);
		}
		//$this->spool->getSpool()->flushQueue( $this->getTransport() );
	}
}