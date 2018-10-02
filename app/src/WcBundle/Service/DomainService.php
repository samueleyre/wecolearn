<?php

namespace WcBundle\Service;



class DomainService {

  private $currentSubDomain;

  public function __construct() {
  }

  public function setSubDomain($subDomaine) {
    $this->currentSubDomain = $subDomaine;
  }

  public function getSubDomain() {
    return $this->currentSubDomain;
  }

}
