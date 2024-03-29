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
use Doctrine\Common\Collections\ArrayCollection;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Put;
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
        Request $params,
        UserService $userService
    )
    {
        if ($params->get("domain_id")) {
            $users = $userService->getAllInCommunity($params->get("domain_id"), true);
        } else {
            $users = $userService->getAll();
        }

        if ($params->get("onlyAdmin")) {
            $users = array_values(array_filter($users, function(User $user) {
                return $user->isCommunityAdmin() || $user->isSuperAdmin();
            }));
        }

        return $users;
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
        return $service->process($user, $user->getRoles());
    }

    /**
     * @Put("admin/user")
     * @ParamConverter(
     *       "user",
     *       class="App\Services\User\Entity\User",
     *       converter="fos_rest.request_body",
     *       options={"deserializationContext"={"groups"={"admin-user-patch"} } }
     * )
     * @param Request $request
     * @View( serializerGroups={"admin-user-patch"})
     */
    public function putUserAction(User $user, Request $request, UserService $userService)
    {

        $authorizedFields = [
            'first_name',
            'last_name',
            'biographie',
            'roles',
            'domains'
        ];

//        todo: add email change option !

        for ($i = 0; $i < count($authorizedFields); ++$i) {
            $getMethod = 'get' . str_replace('_', '', ucwords($authorizedFields[$i], '_'));
            if ($request->get($authorizedFields[$i]) !== null) {
                $userParams[$authorizedFields[$i]] = $user->$getMethod();
            }
        }

        return $userService->putAdmin($user->getId(), $userParams);
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
