<?php

namespace AppBundle\Messenger;

class Message {

	private $message;
	
	public function __construct() {
		
		$this->message = new \Swift_Message();

	}

	public function setTo( Array $recipients ) {
		$this->message->setTo( $recipients);
	}

	public function setFrom ( Array $senders ) {
		$this->message->setFrom( $senders );
	}

	public function setContent(string $content ) {
		$this->message->setBody( $content );
	}

	public function setSubject( string $subject ) {
		$this->message->setSubject( $subject );
	}
}