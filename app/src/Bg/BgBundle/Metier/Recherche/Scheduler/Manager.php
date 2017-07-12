<?php
while( $command->continue() ) {
	$bus->handle( $command );
	$command = $command->nextCommand();
}


// on recharge l'entrepot
// on prevoie de le recharcher a une date ulterieur
// on cherche la prochaine programmation a executer

// on cherche le prochain proxy => on test aussi les proxy blaclisté et inaccessible. 

	// il faut des regle pour les selectionner

// on execute la recherche 
	
	// on peut avoir 

		// un proxy invalid

		// une black list de google

		// une recherche OK

	// proxy invalid => on blacklist le proxy

		// on recupere le prochain

		// on réitère jusqu'a plus de proxy valide 

			// si plus de proxy valide, on envoie un message.

			// on block le processus.


	// black list de google

		// on blaclist le proxy ...

		// on prend le suivant et on réitère jusqu'à avoir une recherche valide.

			// si tout est blaclisté, on envoie une alerte.

			// on block le processus.

	// success

		// on programme la prochaine recherche ( fonction du nombre de recherche )

		// on endore le processus.








		// on informe le proxy. 

