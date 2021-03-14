<?php

namespace App\Services\User\Controller;

use App\Services\Shared\Service\UploadService;
use App\Services\User\Entity\Image;
use App\Services\User\Service\ImageService;
use App\Services\User\Service\UserService;
use FOS\RestBundle\Controller\Annotations\Post;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UploadController extends AbstractController
{
    /**
     * @Post("uploads")
     */
    public function postUploadAction(
        Request $request,
        TokenStorageInterface $tokenStorage,
        UserService $userService,
        UploadService $uploadService,
        ImageService $imageService,
        LoggerInterface $logger
    ) {

        $user = $tokenStorage->getToken()->getUser();


//        move this to service !
        if (null !== $user->getImage()) {
            $image = $user->getImage();
            $date = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
            $image->setUpdated($date);
            $image->setVersion($image->getVersion() + 1);
            $uploadService->uploadImage($image, $request->files->get('file'), $user->getId());
            $imageService->patch($image);
        } else {
            $image = new Image();
            $image->setUser($user);
            $uploadService->uploadImage($image, $request->files->get('file'), $user->getId());
            $imageService->post($image);
        }

        $user->setImage($image);

        return $userService->patch($user);
    }
}
