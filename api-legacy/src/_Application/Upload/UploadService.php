<?php

namespace App\_Application\Upload;

use App\_User\DomainModel\Image\Image;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;



class UploadService
{

  private $em;
  private $uploader;

  public function __construct(EntityManagerInterface $em, \Cloudinary\Uploader $uploader, ParameterBagInterface $params)
  {
    $this->em = $em;
    $this->uploader = $uploader;
    $this->params = $params;

  }


  public function uploadToCloudinary($filepath, $publicId) {

    return $this->uploader->upload($filepath,
      array(
        "folder" => "images/",
        "public_id" => $publicId,
        "overwrite" => TRUE,
        "resource_type" => "image"
      )
    );

  }

  function uploadImage(Image &$image, $file, $id) {

        if (null === $file) {
            return;
        }


        $image->setFileName( "not used anymore");

        $publicId = md5("profil_".$id);

        if ('dev' === $this->params->get('environment')) {

            $publicId = md5("profil_dev_".$id);

        }


        $response = $this->uploadToCloudinary($file, $publicId);

        $image->setPublicId($publicId);
        $image->setVersion($response['version']);


  }

}
