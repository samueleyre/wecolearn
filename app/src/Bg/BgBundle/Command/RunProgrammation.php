<?php

namespace Bg\BgBundle\Command;

use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Bg\BgBundle\Metier\Cron\RunProgrammation as CronRunProgrammation;

class RunProgrammation extends Command
{
    private $logger;

    public function __construct(LoggerInterface $logger, $em, $commandBus )
    {
        
        $this->run = new CronRunProgrammation( $logger, $em , $commandBus );

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
        $this->run->go();
        
    }
}