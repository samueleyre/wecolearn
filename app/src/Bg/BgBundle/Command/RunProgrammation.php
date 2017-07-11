<?php

namespace Bg\BgBundle\Command;

use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Bg\BgBundle\Metier\Cron\RunProgrammation as CronRunProgrammation;
use AppBundle\Env\Manager as Env;


class RunProgrammation extends Command
{
    private $logger;

    public function __construct(LoggerInterface $logger, $em, $commandBus )
    {
        
        $this->run = new CronRunProgrammation( $logger, $em , $commandBus );
        $this->logger = $logger;
        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('bg:run')
            ->setDescription('Run Programmation !');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        while( true ) {
            $usage1 = memory_get_usage();
            $this->run->go();
            $usage2 = memory_get_usage();
            $this->logger->info( sprintf('Memory Usage : %s Ko',($usage2 - $usage1)/1024));
            $sleepTime = 300;
            if( Env::getEnv() < Env::PRODUCTION ) {
                $sleepTime = 1;
            }
            sleep( $sleepTime );
        }
    }
}