<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 09/03/19
 * Time: 15:33
 */

namespace App\_Application\Controller;

use App\_User\DomainModel\User\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use JMS\Serializer\Annotation as Serializer;




class ProfileController extends Controller {

    /**
     * @Get("/profile/{profileUrl}")
     * @View(serializerEnableMaxDepthChecks=true, serializerGroups={"profile"})
     **/
    public function getProfileAction($profileUrl)
    {

        $user = $this
            ->getDoctrine()
            ->getRepository(User::class)
            ->findOneByProfilUrl($profileUrl);

        if($user instanceof User) {
            $ret = $user;
        } else {
            $ret = ['success' => false ];
        }
        return $ret;
    }
}
