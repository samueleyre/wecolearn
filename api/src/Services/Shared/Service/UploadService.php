<?php

namespace App\Services\Shared\Service;

use App\Services\User\Entity\Image;
use Cloudinary\Uploader;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class UploadService
{
    private $em;
    private $uploader;

    public function __construct(EntityManagerInterface $em, Uploader $uploader, ParameterBagInterface $params)
    {
        $this->em = $em;
        $this->uploader = $uploader;
        $this->params = $params;
    }

    public function uploadToCloudinary($filepath, $publicId)
    {
        return $this->uploader->upload(
            $filepath,
            [
            'folder' => 'images/',
            'public_id' => $publicId,
            'overwrite' => true,
            'resource_type' => 'image',
            ]
        );
    }

    public function uploadImage(Image &$image, $file, $id)
    {
        if (null === $file) {
            return;
        }

        $image->setFileName('not used anymore');
        $publicId = md5('profil_'.$id);
        if ('dev' === $this->params->get('environment')) {
            $publicId = md5('profil_dev_'.$id);
        }

        $response = $this->uploadToCloudinary($file, $publicId);

        $image->setPublicId($publicId);
        $image->setVersion($response['version']);
    }
}
