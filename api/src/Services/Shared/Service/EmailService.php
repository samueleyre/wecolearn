<?php

namespace App\Services\Shared\Service;

use Doctrine\ORM\EntityManagerInterface;
use SendinBlue\Client\Api\ContactsApi;
use SendinBlue\Client\Api\SMTPApi;
use SendinBlue\Client\Model\CreateContact;
use SendinBlue\Client\Model\SendSmtpEmail;
use SendinBlue\Client\Model\SendSmtpEmailReplyTo;
use SendinBlue\Client\Model\SendSmtpEmailTo;
use SendinBlue\Client\Model\UpdateContact;

class EmailService
{
    private $em;
    private $deliveryAddress;
    private $sendInBlueApiSmtp;
    private $sendInBlueApiContacts;
    private $data;
    private $environment;


    public function __construct(EntityManagerInterface $em, $deliveryAddress, SMTPApi $sendInBlueApiSmtp, ContactsApi $sendInBlueApiContacts, string $environment)
    {
        $this->em = $em;
        $this->deliveryAddress = $deliveryAddress;
        $this->sendInBlueApiSmtp = $sendInBlueApiSmtp;
        $this->sendInBlueApiContacts = $sendInBlueApiContacts;
        $this->environment = $environment;
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
        $to[] = (new SendSmtpEmailTo())->setEmail(
            $this->environment !== 'prod' ? 'samueleyre@wecolearn.com' : $email
        );
        $replyTo = (new SendSmtpEmailReplyTo())->setEmail($emailSender);
        $this->data = new SendSmtpEmail();
        $this->data
        ->setTemplateId($templateid)
        ->setTo($to)
        ->setReplyTo($replyTo)
        ->setParams($parameters);

        return $this;
    }

    public function sendEmail()
    {
        try {
            $this
                ->sendInBlueApiSmtp
                ->sendTransacEmail($this->data);
        }
        catch (\Exception $e) {
            syslog(LOG_ERR, "Couldn't send email : $e");
        }
    }

    public function addContact($email, $isBlackListed)
    {
        try {
            $createContact = (new CreateContact())->setEmail($email)->setEmailBlacklisted($isBlackListed)->setUpdateEnabled(true);
            $return = $this->sendInBlueApiContacts->createContact($createContact);
            dump($return);
        }
        catch (\Exception $e) {
            syslog(LOG_ERR, "Couldn't add contact for newsletter: $e");
        }
    }

    public function updateContact($oldEmail, $email = null, $isBlackListed = null)
    {
        try {
            $createContact = (new UpdateContact());
            if ($isBlackListed !== null) {
                $createContact->setEmailBlacklisted($isBlackListed);
            }

            if ($email) {
                $createContact->setAttributes(
                    ['email'=>$email]
                );
            }
            $return = $this->sendInBlueApiContacts->updateContactWithHttpInfo($oldEmail, $createContact);
            dump($return);
        }
        catch (\Exception $e) {
            syslog(LOG_ERR, "Couldn't update contact for newsletter: $e");
        }
    }

}
