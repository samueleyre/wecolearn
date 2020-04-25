<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 16/03/19
 * Time: 10:32
 */

namespace App\Services\Domain\Event;

use App\Services\Domain\Service\DomainService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class DomainSubscriber implements EventSubscriberInterface
{
    private $domainService;

    public function __construct(DomainService $domainService) {
        $this->domainService = $domainService;
    }

    public static function getSubscribedEvents()
    {
        return [
                KernelEvents::REQUEST => ['onKernelRequest', 3000],
                KernelEvents::CONTROLLER => 'onKernelController',
                KernelEvents::RESPONSE => 'onKernelResponse',

        ];
    }

    public function onKernelController(FilterControllerEvent $event ) {
        $this->domainService->setRequest($event->getRequest());
    }

    public function onKernelResponse(FilterResponseEvent $event ) {
        $response = $event->getResponse();

        //$response->headers->set('Access-Control-Allow-Headers', 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,Origin,Accept,Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin,accept, x-custom-auth, content-type, authorization, x-pagination');
        //$response->headers->set('Access-Control-Allow-Methods','GET, OPTIONS, POST, PUT, PATCH, DELETE' );
        //$response->headers->set('Access-Control-Allow-Origin', '*');
        //$response->headers->set('Access-Control-Allow-Credentials', 'true');

        $event->setResponse($response);
    }

    public function onKernelRequest(RequestEvent $event ) {
        $request = $event->getRequest();
        foreach($request->headers->all() as $key => $value ) {
            $chaine = sprintf("%s: %s", $key , $value[0]);
            syslog ( LOG_ERR, $chaine );
        }
    }
}
