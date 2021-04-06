<?php

namespace App\Services\Domain\Service;

use App\Services\Domain\Constant\DomainConstant;
use App\Services\Domain\Entity\Domain;
use App\Services\Shared\Entity\Image;
use App\Services\Shared\Service\UploadService;
use App\Services\User\Service\ImageService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class DomainService
{
    public $em;
    private $host;
    private $environment;
    private $uploadService;
    private $imageService;

    public function __construct(EntityManagerInterface $em, $host, $environment, UploadService $uploadService, ImageService $imageService)
    {
        $this->em = $em;
        $this->host = $host;
        $this->environment = $environment;
        $this->request = new Request();
        $this->uploadService = $uploadService;
        $this->imageService = $imageService;

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

    public function put($domain, $params)
    {
        foreach ($params as $key => $value) {
            $setMethod = 'set'.str_replace('_', '', ucwords($key, '_'));
            if ($value !== null) {
                $domain->$setMethod($value);
            }
        }

        $this->em->persist($domain);
        $this->em->flush();

        return $domain;
    }

    public function updateImage($community, $file)
    {
        if (null !== $community->getImage()) {
            $image = $community->getImage();
            $image->refreshUpdated();
            $image->setVersion($image->getVersion() + 1);
            $this->uploadService->uploadImage($image, $file, $community->getId());
            $this->imageService->patch($image);
        } else {
            $image = new Image();
            $image->setDomain($community);
            $this->uploadService->uploadImage($image, $file, $community->getId());
            $this->imageService->post($image);
        }

        $community->setImage($image);;
        $this->em->persist($community);
        $this->em->flush();
        return $community;

    }

    public function create(Domain $domain)
    {
        $domain->isMain = false;
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
