<?php

namespace WcBundle\Controller;

use WcBundle\Entity\Image;
use WcBundle\Entity\Client;

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

use AppBundle\Pagination\Annotation as Pagination;



class UploadController extends GPPDController
{
    
    protected $entityRef = 'WcBundle:Image';

    // "options_uploads" [OPTIONS] /uploads
    public function optionUploadAction()
    {
        return $this->optionAction();
        
    }


    /**
    * @Post("/uploads")
    */
    public function postUploadAction( Request $request )
    {

        $user = $this->get('security.token_storage')->getToken()->getUser();

        $client = $this->getDoctrine()
            ->getRepository(Client::class)
            ->findOneBy(["user"=>$user]);

      $date = new \DateTime("now", new \DateTimeZone('Europe/Paris'));

      if (null !== $client->getImage()) {
        $image = $client->getImage();
        $image->setUpdated($date);
        $image->setFile($request->files->get('file'));
        $image->upload();
        $uploaded = $this
          ->get('gppd.service')
          ->setEntityRef( $this->entityRef )
          ->patch( $image );
      } else {
        $image = new Image;
        $image->setCreated($date);
        $image->setClient($client);
        $image->setFile($request->files->get('file'));
        $image->upload();
        $uploaded = $this
          ->get('gppd.service')
          ->setEntityRef( $this->entityRef )
          ->post( $image );
      }


        $client->setImage($image);


        return
            $this
                ->get('client.service')
                ->patch($client, $user, false, false);


    }




    

}
