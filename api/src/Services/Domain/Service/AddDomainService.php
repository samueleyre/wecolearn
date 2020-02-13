<?php

namespace App\Services\Domain\Service;


use App\Services\User\Entity\User;

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
