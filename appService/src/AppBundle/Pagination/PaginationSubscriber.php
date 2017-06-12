<?php

namespace AppBundle\Pagination;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use \Symfony\Component\DependencyInjection\ContainerInterface;

use Doctrine\Common\Annotations\AnnotationReader;

class PaginationSubscriber implements EventSubscriberInterface
{
    
    public function __construct( ContainerInterface $container )
    {   
        $this->container = $container;
        
    }

    public function onKernelController(FilterControllerEvent $event):void
    {
        $controller = $event->getController();

        /*
         * $controller passed can be either a class or a Closure.
         * This is not usual in Symfony but it may happen.
         * If it is a class, it comes in array format
         */
        if ( ! is_array ( $controller ) ) {
            return;
        }

        $reader = new AnnotationReader();
        
        $object = new \ReflectionObject($controller[0]); // get controller
        $method = $object->getMethod($controller[1]);
        
        
        
        if( $paginationAnnotation = $reader->getMethodAnnotation( $method, 'AppBundle\\Pagination\\Annotation' ) ) 
        {

            $paginationQuery = $this->container->get('pagination.service')->getPaginationQuery();
            $service = $this->container->get( $paginationAnnotation->service );
            if( $service ) {
            
                if( isset( $paginationAnnotation->setters ) 
                        && is_array($paginationAnnotation->setters)
                        ) 
                {

                    foreach( $paginationAnnotation->setters as $setter => $value ) {
                        $service->$function( $value );
                    }
                }

                $service->setPaginationQuery($paginationQuery );
                $paginationQuery->count =  $service->count();
            }

        }

    }

    public static function getSubscribedEvents()
    {
        return array(
            KernelEvents::CONTROLLER => 'onKernelController',
        );
    }
}