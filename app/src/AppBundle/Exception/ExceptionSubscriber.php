<?php

namespace AppBundle\Exception;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Psr\Log\LoggerInterface;



class ExceptionSubscriber implements EventSubscriberInterface
{
    
    public function __construct( ContainerInterface $container, LoggerInterface $logger )
    {   
        $this->container = $container;
        $this->logger = $logger;
        
    }

    public function onKernelException( GetResponseForExceptionEvent $event):void
    {

        $exception = $event->getException();

        // si erreur
        //if( $code = $exception->getCode() >= 500 ) {


            $this->logger->info(  $trace = $exception->getTraceAsString());
            $this->logger->error( $message = $exception->getMessage());

            //if( 'production' !== $this->container->get('env') ) {
                
                $ret = ['code' => 500, 'message' => $message, 'trace' => $trace ];
                
            /*
            } else {

                $ret = [
                    'code' => 500, 
                    'message' => 'Erreur', 
                    'trace' => 'email: edouard.touraille@gmail.com'
                    ]
                ;
            }
            */
            $response = new JsonResponse( $ret, 500 );
            $response->headers->set( 'Access-Control-Allow-Origin', '*');
            $event->setResponse( $response );
        //}

    }

    public static function getSubscribedEvents()
    {
        return array(
            KernelEvents::EXCEPTION => 'onKernelException',
        );
    }
}