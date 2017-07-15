<?php

namespace AppBundle\Messenger;

class Manager {

	public function __construct($mailer) {
		$this->messages = [];
		// Create the Transport
		$this->mailer = $mailer;

	}

	public function getMessage() {
		return new Message();
	}

	public function addMessage( Message $message ) {
		$this->messages[] = $message;
	}

	public function flush() {
		foreach( $this->messages as $message ) {
			$this->mailer->send($message->getMessage());
		}
		//$this->spool->getSpool()->flushQueue( $this->getTransport() );
	}
}