<?php

namespace Bg\BgBundle\Command;

use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Bg\BgBundle\Metier\Recherche\Model\Recherche;

class Rank extends Command
{
    private $logger;

    public function __construct(LoggerInterface $logger, $commandBus )
    {
        
        parent::__construct();

        $this->command = $commandBus;

    }

    protected function configure()
    {
        $this
            ->setName('bg:rank')
            ->setDescription('Rank Command');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        
        $command = new \Bg\BgBundle\Metier\Recherche\Command\LaunchPageRankRecherche;
        
        $this->command->handle( $command );
        
        
    }
}