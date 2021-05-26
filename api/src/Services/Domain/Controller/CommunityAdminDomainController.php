<?php

namespace App\Services\Domain\Controller;

use App\Services\Domain\Entity\Domain;
use App\Services\Domain\Service\DomainService;
use App\Services\Shared\Service\UploadService;
use App\Services\User\Constant\TokenConstant;
use App\Services\User\Service\ImageService;
use App\Services\User\Service\TokenService;
use Exception;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CommunityAdminDomainController extends AbstractController
{


    /**
     * @Get("community-admin/community")
     * @param TokenStorageInterface $tokenStorage
     * @View( serializerGroups={"admin-community"})
     * @return mixed
     */
    public function getCommunityAction(
        TokenStorageInterface $tokenStorage
    ) {
        return $tokenStorage->getToken()->getUser()->getAdminDomain();
    }

    /**
     * @Put("community-admin/community")
     * @ParamConverter(
     *       "domain",
     *       class="App\Services\Domain\Entity\Domain",
     *       converter="fos_rest.request_body",
     *       options={"deserializationContext"={"groups"={"input"} } }
     * )
     * @param DomainService $domainService
     * @param Domain $domain
     * @param Request $request
     * @return mixed
     */
    public function putCommunityAction(
        TokenStorageInterface $tokenStorage,
        DomainService $domainService,
        Domain $domain,
        Request $request
    ) {

        $authorizedFields = ['name'];

        $params = [];
        for ($i = 0; $i < count($authorizedFields); ++$i) {
            $getMethod = 'get' . str_replace('_', '', ucwords($authorizedFields[$i], '_'));
            if ($request->get($authorizedFields[$i]) !== null) {
                $params[$authorizedFields[$i]] = $domain->$getMethod();
            }
        }

        $domain = $tokenStorage->getToken()->getUser()->getAdminDomain();

        return $domainService->put($domain, $params);

    }

    /**
     * @Post("community-admin/uploadCommunityImage")
     * @param Request $request
     * @param TokenStorageInterface $tokenStorage
     * @param DomainService $domainService
     * @param UploadService $uploadService
     * @param ImageService $imageService
     * @return mixed
     * @throws Exception
     */
    public function postUploadCommunityImageAction(
        Request $request,
        TokenStorageInterface $tokenStorage,
        DomainService $domainService
    ) {

        $user = $tokenStorage->getToken()->getUser();

        // get community of user
        $community = $user->getAdminDomain();
        if(!$community) {
            throw new Exception('admin user does not have a community', 400);
        }

        return $domainService->updateImage($community, $request->files->get('file'));

    }

    /**
     * @Get("community-admin/generateNewInviteUrl")
     * @param TokenStorageInterface $tokenStorage
     * @param TokenService $tokenService
     * @return Response
     * @throws Exception
     */
    public function generateNewInviteUrlAction(
        TokenStorageInterface $tokenStorage,
        TokenService $tokenService
    ): Response
    {

        $user = $tokenStorage->getToken()->getUser();

        // get community of user
        $community = $user->getAdminDomain();
        if(!$community) {
            throw new Exception('User does not have a community', 400);
        }

        $inviteToken = $community->getInviteToken();

        if( $inviteToken ) {
            $inviteToken->generateNewToken();
            $tokenService->patch($inviteToken);
        } else {
            $tokenService->createNewToken(TokenConstant::$types["COMMUNITY_INVITE"], null, $community);
        }

        return new Response();
    }



}
