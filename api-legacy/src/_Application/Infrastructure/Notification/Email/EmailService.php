<?php

namespace App\_Application\Infrastructure\Notification\Email;

use Doctrine\ORM\EntityManager;
use Psr\Log\LoggerInterface;
use Doctrine\ORM\EntityManagerInterface;



class EmailService {

	private $em;
	private $logger;
	private $deliveryAddress;
	private $sendInBlueApi;
	private $data;

	//public function __construct( EntityManagerInterface $em, $deliveryAddress, $sendInBlueApi, LoggerInterface $logger) {
    public function __construct( EntityManagerInterface $em, $deliveryAddress, $sendInBlueApi) {
		$this->em = $em;
		//$this->logger = $logger;
        $this->deliveryAddress = $deliveryAddress;
        $this->sendInBlueApi = $sendInBlueApi;

    }


    public function getData($templateid, $parameters, $email, $emailSender = null) // should not be called

    {

      if (null === $emailSender) {
        $emailSender = $this->deliveryAddress;
      }

//      $this->logger->info("TEST in EMAIL SERVICE");
      return [
        "id" => $templateid,
        "to" => $email,
        "from" => $emailSender,
        "attr" => $parameters,
//            "headers" => ["Content-Type"=> "text/html; charset=iso-8859-1","X-param1"=> "value1", "X-param2"=> "value2","X-Mailin-custom"=>"my custom value", "X-Mailin-IP"=> "102.102.1.2", "X-Mailin-Tag" => "My tag"],
      ];


    }

  public function setData($templateid, $parameters, $email, $emailSender = null)

  {

    if (null === $emailSender) {
      $emailSender = $this->deliveryAddress;
    }

    $to = [];
    $to[] = (new \SendinBlue\Client\Model\SendSmtpEmailTo())->setEmail($email);
    $replyTo = (new \SendinBlue\Client\Model\SendSmtpEmailReplyTo())->setEmail($emailSender);
    $this->data = new \SendinBlue\Client\Model\SendSmtpEmail();
    $this->data
        ->setTemplateId($templateid)
        ->setTo($to)
        ->setReplyTo($replyTo)
        ->setParams($parameters)
    ;
    // "headers" => ["Content-Type"=> "text/html; charset=iso-8859-1","X-param1"=> "value1", "X-param2"=> "value2","X-Mailin-custom"=>"my custom value", "X-Mailin-IP"=> "102.102.1.2", "X-Mailin-Tag" => "My tag"],

    return $this;
  }




  public function sendEmail($data = null)
  {

    if ($data === null) { // should be useless after refactoring
      $data = $this->data;
    }

    return $this
      ->sendInBlueApi
      ->sendTransacEmail($data);

  }
}
