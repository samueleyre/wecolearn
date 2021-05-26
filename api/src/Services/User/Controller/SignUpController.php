<?php

namespace App\Services\User\Controller;

use App\Services\Core\Exception\ResourceAlreadyUsedException;
use App\Services\Shared\Entity\Token;
use App\Services\User\Entity\User;


use App\Services\User\Service\CreateUserService;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

use FOS\RestBundle\Controller\Annotations\Post;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;


use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;


class SignUpController extends AbstractController
{
    /**
     * @Post("signup/{communityToken}")
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
    public function postNewUserInCommunityAction(
        string $communityToken,
        User $user,
        CreateUserService $service
    ): User
    {
        try {
            $community = $this->getDoctrine()->getRepository(Token::class)->findOneBy(['token'=>$communityToken])->getDomain();
        }
        catch (\Exception $e) {
            throw new HttpException(400, "token not valid");
        }
        $user->addDomain($community);
        return $service->process($user);
    }

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
        CreateUserService $service
    ): User
    {
        return $service->process($user);
    }

}
