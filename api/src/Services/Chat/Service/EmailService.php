<?php

namespace App\Services\Chat\Service;

use Doctrine\ORM\EntityManagerInterface;

class EmailService
{
    private $em;
    private $deliveryAddress;
    private $sendInBlueApi;
    private $data;

    public function __construct(EntityManagerInterface $em, $deliveryAddress, $sendInBlueApi)
    {
        $this->em = $em;
        $this->deliveryAddress = $deliveryAddress;
        $this->sendInBlueApi = $sendInBlueApi;
    }

    public function getData($templateid, $parameters, $email, $emailSender = null) // should not be called
    {
        if (null === $emailSender) {
            $emailSender = $this->deliveryAddress;
        }

        return [
        'id' => $templateid,
        'to' => $email,
        'from' => $emailSender,
        'attr' => $parameters,
//            "headers" => ["Content-Type"=> "text/html; charset=iso-8859-1","X-param1"=> "value1", "X-param2"=> "value2","X-Mailin-custom"=>"my custom value", "X-Mailin-IP"=> "102.102.1.2", "X-Mailin-Tag" => "My tag"],
      ];
    }

    public function setData($templateid, $parameters, $email, $emailSender = null)
    {
        if (null === $emailSender) {
            $emailSender = $this->deliveryAddress;
        }

        $to = [];
        $to[] = (new SendSmtpEmailTo())->setEmail($email);
        $replyTo = (new SendSmtpEmailReplyTo())->setEmail($emailSender);
        $this->data = new SendSmtpEmail();
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
        if (null === $data) { // should be useless after refactoring
            $data = $this->data;
        }

        return $this
      ->sendInBlueApi
      ->sendTransactionalEmail($data);
    }
}
