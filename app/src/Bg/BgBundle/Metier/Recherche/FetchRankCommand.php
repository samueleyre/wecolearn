<?php

namespace Bg\BgBundle\Recherche;

use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Bg\BgBundle\Metier\Recherche\Command\InitCommand;

class FetchRankCommand extends Command
{
    private $logger;

    public function __construct(LoggerInterface $logger, $commandBus, $waitForService )
    {
        
        //$this->alive = new CronAlive( $logger, $em , $commandBus );

        parent::__construct();

        $this->command = $commandBus;
        $this->waitFor = $waitForService;
        
    }

    protected function configure()
    {
        $this
            ->setName('bg:rank:fetch')
            ->setDescription('Fetch rank command');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        
        if( $command = $this->waitFor->nextCommand()) {

        } else {

            $command = new InitCommand();
        }
        
        while( $command->continue() ) {
            $this->command->handle( $command );
            $command = $command->nextCommand();
        }
    }
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

