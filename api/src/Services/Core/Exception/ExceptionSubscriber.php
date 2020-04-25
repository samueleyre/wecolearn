<?php

namespace App\Services\Core\Exception;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Psr\Log\LoggerInterface;

use Symfony\Component\HttpKernel\Exception\HttpException;



class ExceptionSubscriber implements EventSubscriberInterface
{

    private $logger;

    public function __construct(ContainerInterface $container, LoggerInterface $logger )
    {
        $this->container = $container;
        $this->logger = $logger;

    }

    public function onKernelException( GetResponseForExceptionEvent $event):void
    {

            $exception = $event->getException();

            $code = $exception->getCode();
            if( $exception instanceof HttpException) {

                $code = $statusCode = $exception->getStatusCode();


            } else {

                $statusCode = 500;
            }


        // si erreur
        //if( $code = $exception->getCode() >= 500 ) {
            $message = sprintf('%s %s %s' , $exception->getMessage(), $exception->getFile(), $exception->getLine() );

            $this->logger->info(  $trace = $exception->getTraceAsString());
            $this->logger->error( $message );

            //if( 'production' !== $this->container->get('env') ) {

                $ret = ['code' => $code, 'message' => $message, 'trace' => $trace ];

            /*
            } else {

                $ret = [
                    'code' => 500,
                    'message' => 'Erreur',
                    'trace' => 'email: samueleyre@wecolearn.com'
                    ]
                ;
            }
            */
            $response = new JsonResponse( $ret, $statusCode );
            //$response->headers->set( 'Access-Control-Allow-Origin', '*');
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
