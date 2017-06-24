<?php

namespace Bg\BgBundle\Metier\Cron;

use Bg\BgBundle\Entity\Blog;
use Bg\BgBundle\Entity\BlogState;
use Bg\BgBundle\Metier\Command\FetchEntity;
use Bg\BgBundle\Metier\WriteBlog\Writer\WordPress;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

class Alive {

	public function __construct( $logger, $em, $busCommand ) {
		$this->busCommand = $busCommand;
		$this->em = $em;
		//$streamHandler = new StreamHandler('php://stdout', Logger::INFO);
        //$logger->pushHandler($streamHandler);
        $this->logger = $logger; 

	}

	public function check() {

		$command = new FetchEntity( new Blog() );
		$this->busCommand->handle( $command );
		foreach( $command->getResponse() as $blog ) {
			$up = 1;
			try {

				$this->logger->info('Try :'. $blog->getUrl());
				$wp = new WordPress( $blog->getUrl(), $blog->getLogin(), $blog->getPass());
				$ret = $wp->ping();
				if( true !== $ret ) $up = 0;
				
			
			} catch( \HieuLe\WordpressXmlrpcClient\Exception\NetworkException $e ) {
				
				$up = 0;
				$this->logger->error('Blog cannot be reached');

			
			} catch(\Exception $e ) {

				$this->logger->info('Other execption :'.$e->getMessage());
			}

			$command = new FetchEntity( new BlogState(),['idBlog' => $blog->getId()] );
			$this->busCommand->handle( $command );
			if(count($command->getResponse()) > 0 ) {
				$state = $command->getResponse()[0];
				$merge = true;	
			} else {
				$state = new BlogState();
				$state->setIdBlog($blog->getId());
				$merge = false;

			}
			$state->addState([ time() => $up ]);
			if(  $merge ) $this->em->merge( $state );
			if( !$merge ) $this->em->persist( $state );
			$this->em->flush();
			$this->em->detach( $sate);
			$this->em->detach( $blog );
		}
		//$this->em->flush();
		
	}

}