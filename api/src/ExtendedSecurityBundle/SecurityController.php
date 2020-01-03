<?php
//
//
//namespace App\ExtendedSecurityBundle;
//
//use App\Services\Chat\Service\MercureCookieGenerator;
//use FOS\RestBundle\Controller\Annotations\Post;
//use FOS\UserBundle\Controller\SecurityController as FOSController;
//use Psr\Log\LoggerInterface;
//use Symfony\Component\HttpFoundation\Request;
//use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
//
//
//class SecurityController extends FOSController {
//
//    private $mercureCookieGenerator;
//    private $logger;
//
//    public function __construct(CsrfTokenManagerInterface $tokenManager, MercureCookieGenerator $mercureCookieGenerator, LoggerInterface $logger)
//    {
//        parent::__construct($tokenManager);
//        $this->mercureCookieGenerator = $mercureCookieGenerator;
//        $this->logger = $logger;
//    }
//
//    /**
//     * @Post("signin")
//     */
//    public function loginAction(Request $request){//
////      $response = parent::loginAction($request);
////
////      $user = $this->get('security.token_storage')->getToken()->getUser();
////      $user->setLastConnexion(new \DateTime("now", new \DateTimeZone('Europe/Paris')));
////      $this->get('fos_user.user_manager')->updateUser($user);
////      $response->headers->set('set-cookie', $this->mercureCookieGenerator->generate($user));
////      $response->headers->set('X-Robots-Tag','nofuckingindex');
////      $response->headers->set('X-another-Tag','blablabla');
////      return $response;
//    }
//}
