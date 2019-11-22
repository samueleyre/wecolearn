<?php

namespace App\Services\User\Controller;

//use App\_Application\Domain\AddDomainService;
use App\Services\Core\Exception\ResourceAlreadyUsedException;
use App\Services\User\Entity\User;
use App\Services\User\Entity\Token;


//use App\_Application\Domain\DomainService;
use App\Services\User\Service\CreateUserService;
use App\Services\User\Service\TokenService;
//use App\WcBundle\Service\SlackService;
use App\Services\User\Service\UserService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Patch;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Get;

use FOS\RestBundle\View\ViewHandler;
use FOS\RestBundle\View\View; // Utilisation de la vue de FOSRestBundle

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;


use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\DBAL\Exception\NotNullConstraintViolationException;
//use Doctrine\DBAL\Exception\PDOException;
use Symfony\Component\Debug\ExceptionHandler;
use Symfony\Component\Debug\ErrorHandler;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Provider\AuthenticationProviderInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Csrf\TokenStorage\TokenStorageInterface;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

//use App\Entity\SlackAccount;


class SignUpController extends AbstractController
{
    /**
     * @Post("signup")
     * @ParamConverter(
    "user",
    class="App\Services\User\Entity\User",
    converter="fos_rest.request_body",
    options={"deserializationContext"={"groups"={"input"} } }
    )
     */
    public function postNewUserAction(
        User $user,
        Request $request,
        CreateUserService $service
    ) {
        try {
            return $service->process($user);
        } catch (ResourceAlreadyUsedException $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
    }

//  /**
//   * @Get("login_check/slack")
//   *
//   */
//  public function newSlackUserAction(
//      Request $request,
//      UserService $userService,
//      DomainService $domainService ,
//      SlackService $slackService,
//      CreateUserService $createUserService,
//      AddDomainService $addDomainService
//    )
//  {
//
//
//    if (($code = $request->query->get("code")) && ($redirect_uri = $request->query->get("redirect_uri"))) {
//
//
//      $response =
//        $userService
//        ->getSlackUserData($code, $redirect_uri);
//
//      if ($response->code === 200 && $response->body->ok) {
//
//
//        $response->body->user->email;
//
//        $randPwd = bin2hex(random_bytes(10));
//        $email = $response->body->user->email;
//
//        $ret = [];
//        if ( $user = $userService
//          ->em
//          ->getRepository(User::class)
//          ->findOneBy(['email'=>$email])) { // todo: or if found by slack user id !
//
//
//          if (!$slackService->getSlackAccount($response->body->user->id)) {
//            $slackService->createSlackAccount($user, $response->body->user->id, $response->body->team->id, "slack");
//          }
//
//          $user = $addDomainService->process( $user);
//          $userService->patch( $user, $user->getId() );
//
//
//        } else {
//
//          $user = new User();
//          $user->setEmail($email);
//          $user->setPassword($randPwd);
//          $user->setUsername($response->body->user->name);
//          //todo: also get avatar ! and team name !
//          $user = $createUserService->process($user);
//          $slackAccount = $this->slackService->getSlackAccount($slackId=$response->body->user->id);
//          if (!$slackAccount) {
//
//           $this->slackService->createSlackAccount($user, $slackId, $slackTeamId=$response->body->team->id, "slack");
//
//          } else {
//                //todo:   account already connected to email : xxxxx, do you wish to connected to this account ?
//          }
//          $ret['subscribe']= true;
//        }
//
//        $token = $this->get('lexik_jwt_authentication.jwt_manager')->create($user);
//
//
//        $ret['token']=$token;
//        return $ret;
//
//
//      } else {
//        return $response->body->error;
//      }
//
//
//    } else {
//      return null;
//    }
//  }
}
