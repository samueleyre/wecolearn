<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 09/03/19
 * Time: 15:33.
 */

namespace App\Services\User\Controller;

use App\Services\Core\Exception\ResourceAlreadyUsedException;
use App\Services\User\Entity\User;
use App\Services\User\Service\CreateUserService;
use App\Services\User\Service\UserService;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\Post;
use phpDocumentor\Reflection\Types\Integer;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserAdminController extends AbstractController
{


    /**
     * @Get("admin/user/{id}")
     * @View(serializerEnableMaxDepthChecks=true,
     *     serializerGroups={"output", "receivedMessages":{"output", "sender":{"search"}}})
     **
     * @return object
     */
    public function findUserAction(
        Integer $id,
        UserService $userService
    )
    {
        return $userService->findById($id);
    }

    /**
     * @Get("admin/users")
     * @View( serializerGroups={"admin-users"})
     * @return object[]
     */
    public function getUsersAction(
        UserService $userService
    )
    {
        return $userService->getAll();
    }

    /**
     * @Post("admin/user")
     * @ParamConverter(
    "user",
    class="App\Services\User\Entity\User",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"input"} } }
    )
     */
    public function addUserAction(
        User $user,
        CreateUserService $service
    )
    {
        $user->setPassword('NotDefinedYet');

        try {
            return $service->process($user);
        } catch (ResourceAlreadyUsedException $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
    }

    /**
     * @Patch("admin/user")
     * @ParamConverter(
     *       "user",
     *       class="App\Services\User\Entity\User",
     *       converter="fos_rest.request_body",
     *       options={"deserializationContext"={"groups"={"admin-user-patch"} } }
     * )
     * @param Request $request
     * @View( serializerGroups={"admin-user-patch"})
     */
    public function patchUserAction(User $user, Request $request, UserService $userService)
    {

        $authorizedFields = [
            'first_name',
            'last_name',
            'biographie',
            'intensity',
            'show_profil',
            'new_message_notification',
            'new_match_notification',
            'new_message_mail',
            'new_match_email',
            'roles',
            'domains'
        ];

        for ($i = 0; $i < count($authorizedFields); ++$i) {
            $getMethod = 'get' . str_replace('_', '', ucwords($authorizedFields[$i], '_'));
            if ($request->get($authorizedFields[$i]) !== null) {
                $userParams[$authorizedFields[$i]] = $user->$getMethod();
            }
        }

        return $userService->patchAdmin($user->getId(), $userParams);
    }

    /**
     * @Delete("admin/user/{id}")
     * @return string
     */
    public function deleteUserAction(
        int $id,
        UserService $userService
    )
    {
        return $userService->delete($id);
    }

}
