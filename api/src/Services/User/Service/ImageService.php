<?php

namespace App\Services\User\Service;

use App\Services\Shared\Entity\Image;
use Doctrine\ORM\EntityManagerInterface;

class ImageService
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function post(Image $image)
    {
        $this->em->persist($image);
        $this->em->flush();
        return $this;
    }

    public function patch(Image $image)
    {
        $this->em->persist($image);
        $this->em->flush();
        return $this;
    }
}
