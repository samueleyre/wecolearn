<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Entity\Blog;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Pagination\Annotation as Pagination;



class BlogsController extends GPPDController
{
    
    protected $entityRef = 'BgBundle:Blog';

    // "options_blogs" [OPTIONS] /blogs
    public function optionBlogsAction()
    {
        return $this->optionAction();
        
    } 
    
    /**
	* @Get("/blogs")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Blog"}
     )
    */
    public function getBlogsAction(Request $request )
    {
        
        if( 1 == $request->query->get('alive') ) {
            return $this->get('blog.repository')->fetchAlive();
        }

        $filters = [];

        if( $idHebergeur = $request->query->get('idHebergeur')) {
            $filters = ['idHebergeur' => $idHebergeur];
        }

        return $this->getAction($filters);
		
	}
    
    /**
    * @Post("/blogs")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Blog"}
        )
    * @ParamConverter(
        "blog",
        class="Bg\BgBundle\Entity\Blog", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postBlogsAction( Blog $blog )
    {
        
        $filters = [];
        
        if( $idHebergeur = $request->query->get('idHebergeur')) {
            $filters = ['idHebergeur' => $idHebergeur];
        }

        return 
            $this
                ->postAction($blog, $filters );
        
    }
    
    /**
    * @Patch("/blogs")
    * @Pagination(
        perPage="5",
        service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Blog"}
      )
    * @ParamConverter(
            "blog", 
            class="Bg\BgBundle\Entity\Blog", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
      )
	*/
    public function patchBlogsAction( Blog $blog )
    {
        $filters = [];
        
        if( $idHebergeur = $request->query->get('idHebergeur')) {
            $filters = ['idHebergeur' => $idHebergeur];
        }


        return $this->patchAction( $blog, $filters );
            
    }
    
    /**
    * @Delete("/blogs/{id}")
    * @Pagination(
        perPage="5",service="gppd.service", 
        setters={"setEntityRef":"BgBundle:Blog"}
      )
    */
    public function deleteBlogsAction( $id )
    {
        $filters = [];
        
        if( $idHebergeur = $request->query->get('idHebergeur')) {
            $filters = ['idHebergeur' => $idHebergeur];
        }


        return $this->deleteAction( $id, $filters );
    }
}
