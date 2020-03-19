<?php

namespace App\Services\Tag\Controller;

use App\Services\Tag\Entity\TagDomain;
use App\Services\Tag\Service\TagDomainService;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminTagDomainController extends AbstractController
{
    /**
     * @Get("admin/tagDomains")
     * @View( serializerGroups={"admin-tags"})
     */
    public function getTagDomainsAdminAction() {
        return $this->getDoctrine()
            ->getRepository(TagDomain::class)
            ->findBy([], ['name'=>'ASC']);
    }

    /**
     * @Patch("admin/tagDomain")
     * @ParamConverter(
    "tagDomain",
    class="App\Services\Tag\Entity\TagDomain",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"patch-tag-domain"} } }
    )
     * @View( serializerGroups={"admin-tags"})
     */
    public function patchTagDomainAdminAction(
        TagDomain $tagDomain,
        TagDomainService $tagDomainService
    ) {

        // change name | emoji
        return $tagDomainService->patchTagDomain($tagDomain);
    }

    /**
     * @Post("admin/tagDomain")
     * @ParamConverter(
    "tagDomain",
    class="App\Services\Tag\Entity\TagDomain",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"input"} } }
    )
     */
    public function postTagDomainAdminAction(
        TagDomain $tagDomain,
        TagDomainService $tagDomainService
    ) {
        try {
            return $tagDomainService->create($tagDomain);
        } catch (UniqueConstraintViolationException $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
    }

    /**
     * @Delete("admin/tagDomain/{id}")
     */
    public function deleteTagDomainAdminAction(
        int $id,
        TagDomainService $tagDomainService
    ) {
        return $tagDomainService->delete($id);
    }

}
