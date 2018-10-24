<?php

namespace WcBundle\Controller;

use WcBundle\Entity\Image;
use WcBundle\Entity\User;

use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\StreamedResponse;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use  FOS\RestBundle\Controller\Annotations\Post;
use  FOS\RestBundle\Controller\Annotations\Patch;
use  FOS\RestBundle\Controller\Annotations\Delete;
use  FOS\RestBundle\Controller\Annotations\Get;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;




class UploadController extends Controller
{

    /**
    * @Post("uploads")
    */
    public function postUploadAction( Request $request )
    {

      $user = $this->get('security.token_storage')->getToken()->getUser();

      $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));

      if (null !== $user->getImage()) {
        $image = $user->getImage();
        $image->setUpdated($date);
        $image->setFile($request->files->get('file'));
        $image->upload();
        $uploaded = $this
          ->get('gppd.service')
          ->setEntityRef( 'WcBundle:Image' )
          ->patch( $image );
      } else {
        $image = new Image;
        $image->setCreated($date);
        $image->setUser($user);
        $image->setFile($request->files->get('file'));
        $image->upload();
        $uploaded = $this
          ->get('gppd.service')
          ->setEntityRef( 'WcBundle:Image' )
          ->post( $image );
      }


      $user->setImage($image);

      return
          $this
              ->get('user.service')
              ->patch($user);


    }




    

}
