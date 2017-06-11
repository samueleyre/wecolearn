<?php

namespace Bg\BgBundle\Controller;

use Bg\BgBundle\Entity\Blog;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

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
    * @Pagination(perPage="5",service="blog.service")
	*/
    public function getBlogsAction()
    {
        
        $service = $this->get('blog.service');

        return $service->get();

    }

    
    /**
    * @Route("/api/blogs" )
    * @Method({"POST"})
    * @ParamConverter(
        "user", 
        class="BgBundle\Entity\Blog", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postBlogsAction( Blog $user )
    {
        
        /*
        // find a way to inject conditionnaly some role management.
        // should be created only by me and admin role.
        $userManager = $this->get('fos_user.user_manager');
        
        // roles. default is ROLE_USER.
        if( count( $user->getRoles() ) == 0 && ! in_array('ROLE_USER', $user->getRoles())) {
            $user->addRole('ROLE_USER');
        }
        // password.
        $user->setPlainPassword( $user->getPassword() );
        $user->setPassword(null);

        //should be in configuration.
        $user->setEnabled(true);    

        $userManager->updateUser( $user );

        return $userManager->findUsers();
        */
    }

    // nota annotation should'nt be necessary because type is rest, contribute
    /**
    * @Route("/api/blogs" )
    * @Method({"PATCH"})
    * @ParamConverter(
            "user", 
            class="BgBundle\Entity\Blog", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function patchBlogsAction( Blog $blog )
    {
        // should be update only by me and admin role.
        
        /*
        $userManager = $this->get('fos_user.user_manager');
        $em = $this->getDoctrine()->getManager();

        if( empty( $user->isEnabled() ) ) {
            $user->setEnabled( true );
        }

        if(!empty( $user->getPassword())) {
            $user->setPlainPassword( $user->getPassword());
        }

        $userManager->updateCanonicalFields($user);
        $userManager->updatePassword($user);

        $em->merge( $user );
        $em->flush();


        
        return $userManager->findUsers();
		*/

    }
    
    /**
    * @Route("/api/blogs/{id}" )
    * @Method({"DELETE"})
    */
    public function deleteBlogAction( $id )
    {
        // should be update only by me and admin role.
        
        /*
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserBy(['id'=> $id ]);
        if( $user ) {
            $userManager->deleteUser( $user );
        }

        return $userManager->findUsers();

		*/
    }

    // "get_blog"      [GET] /blogs/{slug}
    public function getBlogAction( $slug )
    {
        
        /*
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserBy(['id' => $slug ]);

        return $user;
        */

    }
}
