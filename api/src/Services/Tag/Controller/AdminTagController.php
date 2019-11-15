<?php

namespace App\Services\Tag\Controller;

use App\Services\Tag\Entity\Tag;
use App\Services\Tag\Service\TagService;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

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
        options={"deserializationContext"={"groups"={"input"} } }
     )
     */
    public function patchTagAdminAction(
        Tag $tag,
        TagService $tagService
    ) {
        return $tagService->patchIteration($tag->getId(), $tag->getIteration());
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
        return $tagService->create($tag);
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
