<?php

namespace App\_Application\Controller;

use App\_User\DomainModel\Image\Image;

use App\_Application\Infrastructure\Persistence\doctrine\CrudService;
use App\_Application\Upload\UploadService;
use App\WcBundle\Service\UserService;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


class UploadController extends Controller
{

    /**
    * @Post("uploads")
    */
    public function postUploadAction(Request $request, TokenStorageInterface $tokenStorage, CrudService $gppd, UserService $userService, UploadService $uploadService )
    {

      $user = $tokenStorage->getToken()->getUser();

      $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));

      if (null !== $user->getImage()) {
        $image = $user->getImage();
        $image->setUpdated($date);
        $image->setVersion($image->getVersion()+1);
        $uploadService->uploadImage($image, $request->files->get('file'), $user->getId());
        $gppd
          ->setEntityRef( 'App\\_User\\DomainModel\\Image\\Image' )
          ->patch( $image );


      } else {
        $image = new Image;
        $image->setCreated($date);
        $image->setUser($user);
        $uploadService->uploadImage($image, $request->files->get('file'), $user->getId());
        $gppd
          ->setEntityRef( 'App\\_User\\DomainModel\\Image\\Image' )
          ->post( $image );

      }

      $user->setImage($image);

      return
          $userService
              ->patch($user);

    }


}
