<?php

namespace WcBundle\Service;

use Doctrine\ORM\EntityManager;
use Psr\Log\LoggerInterface;



class EmailService {

	private $em;
	private $logger;
	private $deliveryAddress;
	private $sendInBlueApi;

	public function __construct( EntityManager $em, $deliveryAddress, $sendInBlueApi, LoggerInterface $logger) {
		$this->em = $em;
		$this->logger = $logger;
    $this->deliveryAddress = $deliveryAddress;
    $this->sendInBlueApi = $sendInBlueApi;

  }


    public function getData($templateid, $parameters, $email, $emailSender = null)

    {

      if (null === $emailSender) {
        $emailSender = $this->deliveryAddress;
      }

//      $this->logger->info("TEST in EMAIL SERVICE");
      return [
        "id" => $templateid,
        "to" => $email,
//            "cc" => ["cc@example.net"=>"cc whom!"],
        "from" => $emailSender,
        "attr" => $parameters,
//            "html" => "test",
//            "headers" => ["Content-Type"=> "text/html; charset=iso-8859-1","X-param1"=> "value1", "X-param2"=> "value2","X-Mailin-custom"=>"my custom value", "X-Mailin-IP"=> "102.102.1.2", "X-Mailin-Tag" => "My tag"],
      ];


    }




  public function sendEmail($data)
  {

    return $this
      ->sendInBlueApi
      ->send_transactional_template($data);

  }


}