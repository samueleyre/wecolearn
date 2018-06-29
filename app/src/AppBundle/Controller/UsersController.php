<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class UsersController extends Controller // todo: is this usefull ?
{
    // "options_users" [OPTIONS] /users
    public function optionsUsersAction()
    {
        return [];
    } 
     // "get_users"     [GET] /users
    public function getUsersAction()
    {
        
        $userManager = $this->get('fos_user.user_manager');
        
        return $userManager->findUsers();

    }

    
    // nota annotation should'nt be necessary because type is rest : contribute
    /**
    * @Route("/api/users" )
    * @Method({"POST"})
    * @ParamConverter(
        "user", 
        class="AppBundle\Entity\User", 
        converter="fos_rest.request_body",
        options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function postUsersAction( User $user )
    {
        
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
    }

    /**
    * @Route("/api/users" )
    * @Method({"PATCH"})
    * @ParamConverter(
            "user", 
            class="AppBundle\Entity\User", 
            converter="fos_rest.request_body",
            options={"deserializationContext"={"groups"={"input"} } }
    )
    */
    public function patchUsersAction( User $user )
    {
        // should be update only by me and admin role.
        
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


    }
    
    /**
    * @Route("/api/users/{id}" )
    * @Method({"DELETE"})
    */
    public function deleteUserAction( $id )
    {
        // should be update only by me and admin role.
        
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserBy(['id'=> $id ]);
        if( $user ) {
            $userManager->deleteUser( $user );
        }

        return $userManager->findUsers();


    }

    // "get_user"      [GET] /users/{slug}
    public function getUserAction($slug)
    {
        
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserBy(['id' => $slug ]);

        return $user;

    }

    public function editUserAction($slug)
    {} // "edit_user"     [GET] /users/{slug}/edit

    public function putUserAction($slug)
    {} // "put_user"      [PUT] /users/{slug}

    public function patchUserAction($slug)
    {} // "patch_user"    [PATCH] /users/{slug}

    public function lockUserAction($slug)
    {} // "lock_user"     [PATCH] /users/{slug}/lock

    public function banUserAction($slug)
    {} // "ban_user"      [PATCH] /users/{slug}/ban

    public function removeUserAction($slug)
    {} // "remove_user"   [GET] /users/{slug}/remove

    public function getUserCommentsAction($slug)
    {} // "get_user_comments"    [GET] /users/{slug}/comments

    public function newUserCommentsAction($slug)
    {} // "new_user_comments"    [GET] /users/{slug}/comments/new

    public function postUserCommentsAction($slug)
    {} // "post_user_comments"   [POST] /users/{slug}/comments

    public function getUserCommentAction($slug, $id)
    {} // "get_user_comment"     [GET] /users/{slug}/comments/{id}

    public function editUserCommentAction($slug, $id)
    {} // "edit_user_comment"    [GET] /users/{slug}/comments/{id}/edit

    public function putUserCommentAction($slug, $id)
    {} // "put_user_comment"     [PUT] /users/{slug}/comments/{id}

    public function postUserCommentVoteAction($slug, $id)
    {} // "post_user_comment_vote" [POST] /users/{slug}/comments/{id}/vote

    public function removeUserCommentAction($slug, $id)
    {} // "remove_user_comment"  [GET] /users/{slug}/comments/{id}/remove

    public function deleteUserCommentAction($slug, $id)
    {} // "delete_user_comment"  [DELETE] /users/{slug}/comments/{id}

    public function linkUserAction($slug)
    {} // "link_user_friend"     [LINK] /users/{slug}

    public function unlinkUserAction($slug)
    {} // "unlink_user_friend"     [UNLINK] /users/{slug}
}
