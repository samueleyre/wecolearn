<?php

namespace WcBundle\Service;

use Symfony\Component\HttpFoundation\Request;

use AppBundle\Constant\SubdomainConstant;


class DomainService {

  private $host;
  private $environment;

  public function __construct($host, $environment) {
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

    return "wecolearn";

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
