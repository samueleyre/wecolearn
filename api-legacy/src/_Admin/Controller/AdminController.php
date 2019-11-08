<?php

namespace App\_Admin\Controller;

use App\_Chat\DomainModel\Message\Message;
use App\_Tag\DomainModel\Tag\Tag;
use App\_User\DomainModel\User\User;

use App\_Application\Domain\DomainService;
use App\_Search\DomainModel\Search\SearchService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;
use  FOS\RestBundle\Controller\Annotations\View;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


class AdminController extends Controller
{



    /**
     * @Get("/admin")
     * @View( serializerGroups={"admin"}
    )
     */

    public function getSearchAction( DomainService $domainService, SearchService $searchService  )
    {


        $filter = [];

        $domain = $domainService->getSubDomain();

        return $searchService
            ->search(null, $filter, $domain);
    }
}
