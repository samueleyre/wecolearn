<?php

namespace Bg\BgBundle\Metier\Recherche\Handler;

use Bg\BgBundle\Metier\Recherche\Command\ProcessSearchCommand;
use Bg\BgBundle\Metier\Recherche\Command\NextProxyCommand;
use Bg\BgBundle\Metier\Recherche\Command\DecandanceProxyCommand;

use Bg\BgBundle\Metier\Recherche\Exception\NoSearchException;
use AppBundle\GoogleSearchApi\Exception\BlackListException;

use Bg\BgBundle\Metier\Recherche\Service\Search;

class ProcessSearchCommandHandler {

	public function __construct( $em ) {
		$this->em = $em;
		$this->successCycle = 0; // to persist if script fails. c'est le rasoire d'Ocam.
		$this->proxyWareHouse = $proxyWareHouse;
	}

	public function handle( ProcessSearchCommand $command ) {

		$proxy = $command->getParam();
		$searchService = Search( $this->em );

		try {

			//$recherche = $searchService->process( $proxy );
			$searchService->process( $proxy );


		} catch( NoSearchException $e ) {

			$newSearchCommand = new ProcessSearchCommand();
			$newSearchCommand->waitFor('d'); // TODO implement wait for.
			$newSearchCommand->setParam( $proxy );
			$command->setNextCommand( $newSearchCommand );

		} catch( BlackListException $e ) {

			$proxy->blacklist();
			//$proxy->blacklist($recherche); // on pourait blacklister par rapport à une recherche.
			// il faut veillez à ne pas reproduire les même recherche sur les même proxy
			// ou tout du moins à faire tourner.
			// si on decadence les proxy, ça devrait suffir, à condition d
			// r1, r2, r3, r4
			// p1, p2, on decade de 1, l'association se fait au bout de 2. la taille du cycle dépend juste du nombre de proxy si on le les mélange pas, mais si on les melange on retombe plus rapidement sur le même proxy
			// donc on decale juste de 1 c'est l'optimum
			// on decal a la fin d'un cycle de recherche 
			$searchNewProxyCommand = new NextProxyCommand();
			$command->setNextCommand( $searchNewProxyCommand );

		} catch( \Exception $e ) { // timeout.
			$proxy->diasble();
			$searchNewProxyCommand = new NextProxyCommand();
			$command->setNextCommand( $searchNewProxyCommand );

		}

		// il faut mesurer le nombre de proxy nécessaire pour pas que ça tombe
		// il ne faut surtout pas cadencer les recherche au même moment, et pas à minuit
		// idéalement les programmer au heures normales des internautes dans la journée.

		// in success.
		$proxy->use();
		$this->em->merge( $proxy);
		$this->em->flush();
		$this->successCycle++;
		if( $this->successCycle >= $this->availableSearch() ) {
			$this->successCycle = 0;
			$nextCommand = new UnbalanceProxyCommand();
			$command->setNextCommand( $nexCommand );
			$this->em->detach($proxy);
		
		} else {
			
			$nextCommand = new NextProxyCommand($proxy);
			$command->setNextCommand($nextCommand);
		
		}
	}

	// TODO, pas bon, devrait être dans un repos ... mais pas sur que ce soit utilisé ailleurs pour le moment.
	private function availableSearch() {
		$query = "SELECT count(search) FROM BgBundle:Recherche search";
		return $this->em->createQuery($query)->getSingleScalarResult();
	}


}