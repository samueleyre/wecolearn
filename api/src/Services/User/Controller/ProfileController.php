<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 09/03/19
 * Time: 15:33.
 */

namespace App\Services\User\Controller;

use App\Services\User\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;

class ProfileController extends AbstractController
{
    /**
     * @Get("/profile/{profileUrl}")
     * @View(serializerEnableMaxDepthChecks=true, serializerGroups={"profile"})
     **/
    public function getProfileAction(string $profileUrl)
    {
        $user = $this
            ->getDoctrine()
            ->getRepository(User::class)
            ->findOneByProfilUrl($profileUrl);

        if ($user instanceof User) {
            $ret = $user;
        } else {
            $ret = ['success' => false];
        }

        return $ret;
    }
}
