<?php

namespace WcBundle\Controller;

use WcBundle\Entity\Client;
use WcBundle\Entity\Tag;

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

use AppBundle\Pagination\Annotation as Pagination;

use JMS\Serializer\Annotation as Serializer;

use JMS\Serializer\SerializationContext;





class SearchController extends GPPDController
{

  protected $entityRef = 'WcBundle:Client';

  // "options_client" [OPTIONS] /client
  public function optionClientAction()
  {
    return $this->optionAction();

  }


  /**
   * @Get("/search")
   * @View( serializerGroups={"search"}
  )
   */
  public function getSearchAction( Request $request )
  {

    $filter = [];

    if ($request->get("tag")) {
        $filter["tag"] = $request->get("tag");
    }

    if ($request->get("latitude")) {
        $filter["latitude"] = $request->get("latitude");
    }

    if ( $request->get('longitude')) {
        $filter["longitude"] = $request->get("longitude");
    }

    if( null !== $request->query->get('first') ) {
      $filter['first'] = $request->get('first');
    }

    if( null !== $request->get('max') ) {
      $filter['max'] = $request->get('max');
    }

    $domain = $this->get('domain.service')->getSubDomain($request);

    return $this
        ->get('search.service')
        ->search(null, $filter, $domain);
  }
}
