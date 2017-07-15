<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Command\ProcessSearchCommand;
use Bg\BgBundle\Metier\Recherche\Command\NextProxyCommand;
use Bg\BgBundle\Metier\Recherche\Command\DecandanceProxyCommand;
use Bg\BgBundle\Metier\Recherche\Command\UnbalanceProxyCommand;


use Bg\BgBundle\Metier\Recherche\Exception\NoSearchException;
use AppBundle\GoogleSearchApi\Exception\BlackListException;

use Bg\BgBundle\Metier\Recherche\Service\Search;
use Bg\BgBundle\Metier\Recherche\Service\SuccessCycle;


class ProcessSearchCommandHandler {

	public function __construct( $em, $logger ) {
		$this->em = $em;
		$this->logger = $logger;
		$this->successCycle = new SuccessCycle( $em );
	}

	public function handle( ProcessSearchCommand $command ) {

		$this->log("Lancement d'un nouvelle recherche");
		
		$proxy = $command->fetchParam();
		$this->log( sprintf( "Use proxy %s", $proxy->getHost() ) );
		$searchService = new Search( $this->em , $this->logger);


		try {

			//$recherche = $searchService->process( $proxy );
			$searchService->process( $proxy );


		} catch( NoSearchException $e ) {

			$this->log("Pas de recherche en cours");
			$newSearchCommand = new ProcessSearchCommand();
			$newSearchCommand->waitFor('d'); // TODO implement wait for.
			$newSearchCommand->setParam( $proxy );
			$command->setNextCommand( $newSearchCommand );

		} catch( BlackListException $e ) {

			$this->log(
					sprintf("Le proxy ( %s ) est blacklisté", $proxy->getHost()	)
					
			);
			$proxy->blacklist();
			//$proxy->blacklist($recherche); // on pourait blacklister par rapport à une recherche.
			// il faut veillez à ne pas reproduire les même recherche sur les même proxy
			// ou tout du moins à faire tourner.
			// si on decadence les proxy, ça devrait suffir, à condition d
			// r1, r2, r3, r4
			// p1, p2, on decade de 1, l'association se fait au bout de 2. la taille du cycle dépend juste du nombre de proxy si on le les mélange pas, mais si on les melange on retombe plus rapidement sur le même proxy
			// donc on decale juste de 1 c'est l'optimum
			// on decal a la fin d'un cycle de recherche 
			$searchNewProxyCommand = new NextProxyCommand($proxy);
			$command->setNextCommand( $searchNewProxyCommand );

		} catch( \GuzzleHttp\Exception\ConnectException $e ) { // timeout.
			$this->log(sprintf("Exception de type : %s, le proxy ( %s) ne reponds pas ", get_class( $e), $proxy->getHost()));
			$searchNewProxyCommand = new NextProxyCommand($proxy);
			$command->setNextCommand( $searchNewProxyCommand );
			$proxy->disable();

		}

		// il faut mesurer le nombre de proxy nécessaire pour pas que ça tombe
		// il ne faut surtout pas cadencer les recherche au même moment, et pas à minuit
		// idéalement les programmer au heures normales des internautes dans la journée.

		// in success.
		$proxy->use();
		$this->em->merge( $proxy);
		$this->em->flush();
		if( $isCycleOver = $this->successCycle->cycle() ) {
			
			$this->log("Un cycle complet de recherche est terminé");
			
			$nextCommand = new UnbalanceProxyCommand();
			$command->setNextCommand( $nextCommand );
			$this->em->detach($proxy);
		
		} else {
			
			$this->log("Le cycle de recherche n'est pas terminé, recherche d'un nouveau proxy");
			
			$nextCommand = new NextProxyCommand($proxy);
			$command->setNextCommand($nextCommand);
		
		}
	}

	private function log( $message ) {

		$this->logger->info( $message );
	
	}

}