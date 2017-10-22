<?php

namespace WcBundle\Service;

use Doctrine\ORM\EntityManager;


class EmailService {

	private $em;

	public function __construct( EntityManager $em ) {
		$this->em = $em;
	}


    public function getData($templateid, $data, $email)
    {
        return [
            "id" => $templateid,
            "to" => $email,
//            "cc" => ["cc@example.net"=>"cc whom!"],
            "from" => "samuel.eyre@hotmail.fr",
            "attr" => $data,
//            "html" => "test",
//            "headers" => ["Content-Type"=> "text/html; charset=iso-8859-1","X-param1"=> "value1", "X-param2"=> "value2","X-Mailin-custom"=>"my custom value", "X-Mailin-IP"=> "102.102.1.2", "X-Mailin-Tag" => "My tag"],
        ];


    }


}