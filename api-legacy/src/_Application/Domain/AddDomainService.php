<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 16/03/19
 * Time: 11:26
 */

namespace App\_Application\Domain;


use App\_User\DomainModel\User\User;

class AddDomainService
{

    private $domainService;

    public function __construct(DomainService $domainService ) {

        $this->domainService = $domainService;

    }

    public function process( User $user ) {

        $domainName = $this->domainService->getSubDomain();

        $domain = $this->domainService->getSubDomainEntity($domainName);

        if (!$domain) {
            $domain = $this->domainService->createSubDomainEntity($domainName);
        }

        if (null === $user->getDomains() || false === $user->getDomains()->indexOf($domain)) {
            $user->addDomain($domain);
        }

        return $user;

    }
}
