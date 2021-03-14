<?php

namespace App\Services\User\Controller;

use App\Services\Core\Exception\ResourceAlreadyUsedException;
use App\Services\User\Entity\User;


use App\Services\User\Service\CreateUserService;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

use FOS\RestBundle\Controller\Annotations\Post;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;


use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;


class SignUpController extends AbstractController
{
    /**
     * @Post("signup")
     * @ParamConverter(
    "user",
    class="App\Services\User\Entity\User",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"create"} } }
    )
     * @View( serializerGroups={"profile"})
     * @param User $user
     * @param Request $request
     * @param CreateUserService $service
     * @return User|JsonResponse
     */
    public function postNewUserAction(
        User $user,
        Request $request,
        CreateUserService $service
    ) {
        return $service->process($user);
    }
}
