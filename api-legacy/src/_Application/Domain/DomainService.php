<?php

namespace App\_Application\Domain;

use Doctrine\ORM\EntityManagerInterface;
use App\_Application\Domain\Domain;
use Symfony\Component\HttpFoundation\Request;

use App\_Application\Domain\SubdomainConstant;



class DomainService {

  public $em;
  private $host;
  private $environment;

  public function __construct( EntityManagerInterface $em, $host, $environment) {
    $this->em = $em;
    $this->host = $host;
    $this->environment = $environment;
    $this->request = new Request();

  }

  public function setRequest(Request $request ) {

      $this->request = $request;

  }




  public function getSubDomain() {

    $domain = $this->request->headers->get('origin');

    for ($i = 0; $i< count(SubdomainConstant::$list);$i++ ) {
      if (strpos($domain, SubdomainConstant::$list[$i]) !== false) {
        return SubdomainConstant::$list[$i];
      }
    }

    if ("dev" === $this->environment) {
      return "wecolearn";
    }

    return "wecolearn";

  }

  public function getSubDomainEntity($domainName) {

    return $domainEntity = $this->em->getRepository(Domain::Class)->findOneBy(["name"=>$domainName]);



  }

  public function createSubDomainEntity($domainName) {

      $domain = new Domain();
      $domain->setName($domainName);
      return $domain;

  }

  public function getHost() {


    $host = $this->host;
    if ("dev" === $this->environment) {
      $host = "http://" . $host;
    } else {
      if ("wecolearn" !== ( $subDomain = $this->getSubDomain()) ) {
        $host = "https://".$subDomain.".".$host;
      } else {
        $host = "https://".$host;
      }
    }

    return $host;

  }




}
