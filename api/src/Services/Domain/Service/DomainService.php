<?php

namespace App\Services\Domain\Service;

use App\Services\Domain\Constant\DomainConstant;
use App\Services\Domain\Entity\Domain;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class DomainService
{
    public $em;
    private $host;
    private $environment;

    public function __construct(EntityManagerInterface $em, $host, $environment)
    {
        $this->em = $em;
        $this->host = $host;
        $this->environment = $environment;
        $this->request = new Request();
    }

    public function setRequest(Request $request)
    {
        $this->request = $request;
    }

    public function getSubDomain()
    {
        $domain = $this->request->headers->get('origin');

//     todo: clean this, sub domains should be in dbb
        for ($i = 0; $i < count(DomainConstant::$subDomains); ++$i) {
            if (false !== strpos($domain, DomainConstant::$subDomains[$i])) {
                return DomainConstant::$subDomains[$i];
            }
        }

        if ('dev' === $this->environment) {
            return DomainConstant::$mainDomain;
        }

        return DomainConstant::$mainDomain;
    }

    public function getSubDomainEntity($domainName)
    {
        return $this->em->getRepository(Domain::class)->findOneBy(['name' => $domainName]);
    }

    public function createSubDomainEntity($domainName)
    {
        $domain = new Domain();
        $domain->setName($domainName);

        return $domain;
    }

    public function getHost()
    {
        $host = $this->host;
        if ('dev' === $this->environment) {
            $host = 'http://'.$host;
        } else {
            if ('wecolearn' !== ($subDomain = $this->getSubDomain())) {
                $host = 'https://'.$subDomain.'.'.$host;
            } else {
                $host = 'https://'.$host;
            }
        }

        return $host;
    }

    public function getAll()
    {
        return $this->em->getRepository(Domain::class)->findAll();
    }

    public function patchName(int $id, string $name)
    {
        $domain = $this->em->getRepository(Domain::class)->find($id);
        $domain->setName($name);
        $this->em->merge($domain);
        $this->em->flush();
        return $domain;
    }

    public function create(Domain $domain)
    {
        $this->em->persist($domain);
        $this->em->flush();
        return $domain;
    }

    public function delete(int $id)
    {
        $domain = $this->em->getRepository(Domain::class)->find($id);
        $this->em->remove($domain);
        $this->em->flush();
        return $domain;
    }
}
