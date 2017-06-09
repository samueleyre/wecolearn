    <?php
// src/AppBundle/EventSubscriber/TokenSubscriber.php
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

    public function onKernelController(FilterControllerEvent $event)
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

        $object = new \ReflectionObject($controller[0]); // get controller
        $method = $object->getMethod($controller[1]);
        $reflectionClass = new \ReflectionClass($controller[0]);
        $reader = new AnnotationReader();

        // TODO check if reflexion method is not just enough.
        foreach ($reflectionClass->getMethods() as $reflectionMethod ) {
            if( $reflectionMethod == $method
                && $paginationAnnotation =  
                    $reader->getMethodAnnotation( $reflectionMethod, 'AppBundle\\Pagination\\Annotation' ) ) 
            {

                $paginationQuery = $this->container->get('pagination.service')->getPaginationQuery();
                $paginationQuery->perPage = $paginationAnnotation->perPage;
                $service = $this->container->get( $paginationAnnotation->service );
                $paginationQuery->count =  $service->count();
                $service->setPaginationQuery($paginationQuery );

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