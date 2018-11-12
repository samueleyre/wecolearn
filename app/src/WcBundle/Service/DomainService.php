<?php

namespace WcBundle\Service;

use WcBundle\Entity\Domain;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManager;

use WcBundle\Constant\SubdomainConstant;



class DomainService {

  public $em;
  private $host;
  private $environment;

  public function __construct( EntityManager $em, $host, $environment) {
    $this->em = $em;
    $this->host = $host;
    $this->environment = $environment;

  }


  public function getSubDomain(Request $request) {

    $domain = $request->headers->get('origin');

    for ($i = 0; $i< count(SubdomainConstant::$list);$i++ ) {
      if (strpos($domain, SubdomainConstant::$list[$i]) !== false) {
        return SubdomainConstant::$list[$i];
      }
    }

    if ("dev" === $this->environment) {
      return "lesbricodeurs";
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

  public function getHost(Request $request) {


    $host = $this->host;
    if ("dev" === $this->environment) {
      $host = "http://" . $host;
    } else {
      if ("wecolearn" !== ( $subDomain = $this->getSubDomain($request)) ) {
        $host = "https://".$subDomain.".".$host;
      } else {
        $host = "https://".$host;
      }
    }

    return $host;

  }




}
