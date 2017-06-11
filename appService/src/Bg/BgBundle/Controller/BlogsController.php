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


class BlogsController extends Controller
{
    
    // "options_blogs" [OPTIONS] /blogs
    public function optionsBlogsAction()
    {
        return [];
        
    } 
     // "get_blogs"     [GET] /blogs
    
    /**
	* @Get("/blogs")
    * @Pagination(perPage="5",service="blog.service")
    */
    public function getBlogsAction()
    {
        
        return $this->get('blog.service')->get();
		
	}

    
    /**
    * @Pagination(perPage="5",service="blog.service")
    * @Post("/blogs")
    * @ParamConverter(
        "blog",
        class="Bg\BgBundle\Entity\Blog", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postBlogsAction( Blog $blog )
    {
        
        return $this->get('blog.service')->post( $blog )->get();
        
    }

    /**
    * @Pagination(perPage="5",service="blog.service")
    * @Patch("/blogs")
    * @ParamConverter(
            "blog", 
            class="Bg\BgBundle\Entity\Blog", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
    )
	*/
    public function patchBlogsAction( Blog $blog )
    {
        // should be update only by me and admin role.
        return $this->get('blog.service')->patch( $blog )->get();
    }
    
    /**
    * @Pagination(perPage="5",service="blog.service")
    * @Delete("/blogs/{id}" )
    * @Method({"DELETE"})
    */
    public function deleteBlogAction( $id )
    {
        return $this->get('blog.service')->delete( $id )->get();
    }

    // "get_blog"      [GET] /blogs/{slug}
    public function getBlogAction( $slug )
    {
        
    }

    public function editBlogAction($slug)
    {} // "edit_user"     [GET] /users/{slug}/edit

    public function putBlogAction($slug)
    {} // "put_user"      [PUT] /users/{slug}

    public function patchBlogAction($slug)
    {} // "patch_user"    [PATCH] /users/{slug}

    public function lockBlogAction($slug)
    {} // "lock_user"     [PATCH] /users/{slug}/lock

    public function banBlogAction($slug)
    {} // "ban_user"      [PATCH] /users/{slug}/ban

    public function removeBlogAction($slug)
    {} // "remove_user"   [GET] /users/{slug}/remove

}
