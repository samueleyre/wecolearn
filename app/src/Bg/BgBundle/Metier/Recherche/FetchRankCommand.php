<?php

namespace Bg\BgBundle\Metier\Recherche;

use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputDefinition;

use Bg\BgBundle\Metier\Recherche\Command\InitCommand;
use Bg\BgBundle\Metier\Recherche\Command\EndCommand;
use Bg\BgBundle\Metier\Recherche\Service\WaitFor;
use Bg\BgBundle\Metier\Recherche\Service\At;


class FetchRankCommand extends Command
{
    private $logger;

    public function __construct(LoggerInterface $logger, $commandBus )
    {
        
        //$this->alive = new CronAlive( $logger, $em , $commandBus );

        parent::__construct();

        $this->logger = $logger;

        $this->command = $commandBus;
        
        
    }

    protected function configure()
    {
        $this
            ->setName('bg:rank')
            ->setDescription('Fetch rank command')
            ->setDefinition(
                new InputDefinition([
                    new InputArgument('scheduled', InputArgument::OPTIONAL),
                ])
            );
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        
        if( null !== $scheduled = $input->getArgument('scheduled')) {
            
            $this
                ->logger
                ->info("cette recherche est programmé");
            
            $command = waitFor::nextCommand();
        
        } else {

            $at = new At();
            if( $at->isScheduled() ) {

                $this
                    ->logger
                    ->info("Un évènement est déjà programmé => fin du processus")
                ;
                $command = new EndCommand();
            
            } else {

                $command = new InitCommand();    
            }

        
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

