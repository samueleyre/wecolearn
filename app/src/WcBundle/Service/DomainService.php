<?php

namespace WcBundle\Service;

use Symfony\Component\HttpFoundation\Request;

use AppBundle\Constant\SubdomainConstant;


class DomainService {

  private $currentSubDomain;

  public function __construct() {
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




}
