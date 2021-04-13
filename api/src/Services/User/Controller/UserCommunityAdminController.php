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
use App\Services\User\Service\CommunityAdminUserService;
use App\Services\User\Service\CreateUserService;
use App\Services\User\Service\UserService;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Exception;
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
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UserCommunityAdminController extends AbstractController
{


    /**
     * @Get("community-admin/user/{id}")
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
        return $userService->findInCommunityById($id);
    }

    /**
     * @Get("community-admin/users")
     * @View( serializerGroups={"community-admin-users"})
     * @return object[]
     */
    public function getUsersAction(
        UserService $userService
    )
    {
        return $userService->getAllInCommunity();
    }

    /**
     * @Post("community-admin/user")
     * @ParamConverter(
    "user",
    class="App\Services\User\Entity\User",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"input"} } }
    )
     * @View( serializerGroups={"community-admin-user-patch"})
     */
    public function addUserAction(
        User $user,
        CommunityAdminUserService $service,
        TokenStorageInterface $tokenStorage
    )
    {
        // community admin can only create user in his/her community
        $domain = $tokenStorage->getToken()->getUser()->getDomains()[0];
        try {
            return $service->addUserToCommunity($user->getEmail(), $domain);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], $e->getCode());
        }
    }

    /**
     * @Put("community-admin/user")
     * @ParamConverter(
     *       "user",
     *       class="App\Services\User\Entity\User",
     *       converter="fos_rest.request_body",
     *       options={"deserializationContext"={"groups"={"admin-user-patch"} } }
     * )
     * @param Request $request
     * @View( serializerGroups={"community-admin-user-patch"})
     */
    public function putUserAction(User $user, Request $request, UserService $userService)
    {

        $authorizedFields = [
            'first_name',
            'last_name',
            'biographie',
        ];

        for ($i = 0; $i < count($authorizedFields); ++$i) {
            $getMethod = 'get' . str_replace('_', '', ucwords($authorizedFields[$i], '_'));
            if ($request->get($authorizedFields[$i]) !== null) {
                $userParams[$authorizedFields[$i]] = $user->$getMethod();
            }
        }

        return $userService->putCommunityAdmin($user->getId(), $userParams);
    }

    /**
     * @Delete("community-admin/user/{id}")
     * @return string
     */
    public function deleteUserAction(
        int $id,
        UserService $userService
    )
    {
        return $userService->removeFromCommunity($id);
    }

}
