<?php

namespace App\Services\Domain\Controller;

use App\Services\Domain\Entity\Domain;
use App\Services\Domain\Service\DomainService;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminDomainController extends AbstractController
{
    /**
     * @Get("admin/domains")
     * @View( serializerGroups={"admin-domains"})
     */
    public function getDomainsAdminAction(
        DomainService $domainService
    ) {
        $domains = $domainService->getAll();
        foreach ($domains as $domain) {
            $domain->countUsers();
        }
        return $domains;
    }

//    /**
//     * @Patch("admin/domain")
//     * @ParamConverter(
//    "domain",
//    class="App\Services\Domain\Entity\Domain",
//    converter="fos_rest.request_body",
//    options={"deserializationContext"={"groups"={"input"} } }
//    )
//     */
//    public function patchDomainAdminAction(
//        Domain $domain,
//        DomainService $domainService
//    ) {
//        return $domainService->patchName($domain->getId(), $domain->getName());
//    }

    /**
     * @Post("admin/domain")
     * @ParamConverter(
    "domain",
    class="App\Services\Domain\Entity\Domain",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"input"} } }
    )
     */
    public function postDomainAdminAction(
        Domain $domain,
        DomainService $domainService
    ) {
        return $domainService->create($domain);
    }

//    /**
//     * @Delete("admin/domain/{id}")
//     */
//    public function deleteDomainAdminAction(
//        int $id,
//        DomainService $domainService
//    ) {
//        return $domainService->delete($id);
//    }
}
