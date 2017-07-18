<?php

namespace AppBundle\Command;

use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Bg\BgBundle\Metier\Cron\Alive as CronAlive;
use Bg\BgBundle\Metier\WriteBlog\Writer\WordPress;
use Bg\BgBundle\Metier\WriteBlog\Content\Main;


use Bg\BgBundle\Metier\Recherche\Model\Recherche;

use Bg\BgBundle\Metier\Command\FetchEntity;
use Bg\BgBundle\Entity\Blog;

class Test extends Command
{
    private $logger;

    public function __construct(LoggerInterface $logger, $em, $commandBus )
    {
        
        //$this->alive = new CronAlive( $logger, $em , $commandBus );

        parent::__construct();

        $this->command = $commandBus;
        $this->em = $em;

    }

    protected function configure()
    {
        $this
            ->setName('app:test')
            ->setDescription('Test Command !');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        
        //$cycle = new \Bg\BgBundle\Metier\Recherche\Service\SuccessCycle($this->em);

        //dump( $isOver = $cycle->cycle());

        $command = new \Bg\BgBundle\Metier\Recherche\Command\InitCommand; 
        $m1 = memory_get_usage();
        $command->waitFor('d');
        $command->continue();
        $m2 =memory_get_usage();

        echo (ceil(($m2-$m1)/1024)). 'ko';
    
    }

}