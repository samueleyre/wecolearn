<?php

namespace AppBundle\Command;

use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Bg\BgBundle\Metier\Cron\Alive as CronAlive;
use Bg\BgBundle\Metier\WriteBlog\Writer\WordPress;


use Bg\BgBundle\Metier\Recherche\Model\Recherche;

class Test extends Command
{
    private $logger;

    public function __construct(LoggerInterface $logger, $em, $commandBus )
    {
        
        //$this->alive = new CronAlive( $logger, $em , $commandBus );

        parent::__construct();

        $this->command = $commandBus;

    }

    protected function configure()
    {
        $this
            ->setName('app:test')
            ->setDescription('Test Command !');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        
        $writter = new WordPress('http://flibusteam.io',
                                        'etouraille',
                                        'b1otope'
                                        )
                                    ;
                                    
                dump($writter->newPage('hello','le soleil brille'));
                                    
                                    
                                    
                                        //$writter->newPost($title,$contentText);
                                    


        $command = new \Bg\BgBundle\Metier\Recherche\Command\LaunchPageRankRecherche;
        
        $this->command->handle( $command );
        
        
    }
}