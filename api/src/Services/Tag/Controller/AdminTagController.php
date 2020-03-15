<?php

namespace App\Services\Tag\Controller;

use App\Services\Tag\Entity\Tag;
use App\Services\Tag\Service\TagService;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminTagController extends AbstractController
{
    /**
     * @Get("admin/tags")
     * @View( serializerGroups={"admin-tags"})
     */
    public function getTagsAdminAction(
        TagService $tagService
    ) {
        return $tagService->getAllByImportance();
    }

    /**
     * @Patch("admin/tag")
     * @ParamConverter(
        "tag",
        class="App\Services\Tag\Entity\Tag",
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"putTag"} } }
     )
     * @View( serializerGroups={"admin-tags"})
     */
    public function patchTagAdminAction(
        Tag $tag,
        TagService $tagService
    ) {

        // change iteration | name | tagDomain
        return $tagService->patchTag($tag);
    }

    /**
     * @Post("admin/tag")
     * @ParamConverter(
    "tag",
    class="App\Services\Tag\Entity\Tag",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"input"} } }
    )
     */
    public function postTagAdminAction(
        Tag $tag,
        TagService $tagService
    ) {
        try {
            return $tagService->create($tag);
        } catch (UniqueConstraintViolationException $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
    }

    /**
     * @Post("admin/tagMerge")
    )
     */
    public function postTagMergeAdminAction(
        Request $request,
        TagService $tagService
    ) {

        return $tagService->merge(
            [
                "oldTagId" => $request->get('oldId'),
                "mergedTagId" => $request->get('mergedId')
            ]
        );
    }


    /**
     * @Delete("admin/tag/{id}")
     */
    public function deleteTagAdminAction(
        int $id,
        TagService $tagService
    ) {
        return $tagService->delete($id);
    }
}
