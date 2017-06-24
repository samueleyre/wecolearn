<?php

namespace Bg\BgBundle\Command;

use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Bg\BgBundle\Metier\Cron\Alive as CronAlive;

class Alive extends Command
{
    private $logger;

    public function __construct(LoggerInterface $logger, $em, $commandBus )
    {
        
        $this->alive = new CronAlive( $logger, $em , $commandBus );

        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('bg:alive')
            ->setDescription('Check alive blogs !');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->alive->check();
        
    }
}