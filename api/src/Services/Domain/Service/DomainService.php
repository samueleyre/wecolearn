<?php

namespace App\Services\Domain\Service;

use App\Services\Domain\Constant\DomainConstant;
use App\Services\Domain\Entity\Domain;
use App\Services\Shared\Entity\Image;
use App\Services\Shared\Entity\Token;
use App\Services\Shared\Service\UploadService;
use App\Services\Tag\Entity\TagDomain;
use App\Services\User\Entity\User;
use App\Services\User\Service\ImageService;
use App\Services\User\Service\TokenService;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class DomainService
{
    public $em;
    private $host;
    private $environment;
    private $uploadService;
    private $imageService;
    private $tokenService;

    public function __construct(EntityManagerInterface $em, $host, $environment, UploadService $uploadService, ImageService $imageService, TokenService $tokenService)
    {
        $this->em = $em;
        $this->host = $host;
        $this->environment = $environment;
        $this->request = new Request();
        $this->uploadService = $uploadService;
        $this->imageService = $imageService;
        $this->tokenService = $tokenService;

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

    /*
     * Update name & admins
     */
    /**
     * @throws \Exception
     */
    public function adminPatchDomain(Domain $domain) {
        $oldDomain = $this->em->getRepository(Domain::class)->find($domain->getId());

        $oldDomain->setName($domain->getName());

        if ($domain->getCommunityAdmins()->count() > 0) {

    //        remove old admins
            foreach($oldDomain->getCommunityAdmins() as $oldAdmin) {
                $oldAdmin->setAdminDomain(null);
                $oldDomain->removeCommunityAdmin($oldAdmin);
                $this->em->persist($oldAdmin);
            }

            foreach ($domain->getCommunityAdmins() as $admin) {

//                have to get it from DB or it doesn't persist properly
                $user = $this->em->getRepository(User::class)->find($admin->getId());

                // don't add user to another community if it is already connected to one
                if (!$user->getAdminDomain()) {
                    $oldDomain->addCommunityAdmin($user);
                    $user->setAdminDomain($oldDomain);
                    $this->em->persist($user);
                } else if ($user->getAdminDomain()->getId() !== $domain->getId()) {
                    throw new \Exception('Already an admin of another community', 400);
                }
            }
        }

        $this->em->persist($oldDomain);
        $this->em->flush();

        return $oldDomain;
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
        $communityAdmins = $domain->getCommunityAdmins();
        $domain->setCommunityAdmins(new ArrayCollection());
        foreach($communityAdmins as $communityAdmin) {
            $currentCommunityAdmin = $this->em->getRepository(User::class)->find($communityAdmin->getId());
            $currentCommunityAdmin->setAdminDomain($domain);
            $domain->addCommunityAdmin($currentCommunityAdmin);
            $this->em->persist($currentCommunityAdmin);
        }
        $this->em->persist($domain);
        $this->em->flush();

        $this->tokenService->createFirstInviteToken($domain);
        return $domain;
    }

    public function delete(int $id)
    {
        $domain = $this->em->getRepository(Domain::class)->find($id);
        $this->em->remove($domain);
        $this->em->flush();
        return $domain;
    }

    /**
     * @throws \Exception
     */
    public function addUserToCommunityWithInviteToken(User $user, string $tokenName): Domain
    {
        try {
            $token = $this->em->getRepository(Token::class)->findOneBy(['token'=>$tokenName]);
            $community = $token->getDomain();
        }
        catch (\Exception $e) {
            throw new HttpException(400, "token not valid");
        }

        $this->addUserToCommunity($user, $community);
        return $community;
    }

    /**
     * @throws \Exception
     */
    public function addUserToCommunity(User $user, Domain $domain): User
    {
        try {
            $user->addDomain($domain);
            $this->em->persist($user);
            $this->em->flush();
        }
        catch (\Exception $e) {
            throw new HttpException(409, 'already in community');
        }

        return $user;
    }

    public function defaultDomain(): Domain
    {
        return $this->em->getRepository(Domain::class)->findOneBy(["isMain" => true]);
    }
}
