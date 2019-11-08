<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 16/03/19
 * Time: 10:32
 */

namespace App\_Application\Domain;


use App\_Application\Domain\DomainService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
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
                KernelEvents::CONTROLLER => 'onKernelController'
        ];
    }

    public function onKernelController(FilterControllerEvent $event ) {
        $this->domainService->setRequest($event->getRequest());
    }
}
