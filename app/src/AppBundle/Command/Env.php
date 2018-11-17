<?php

namespace AppBundle\Command;

use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use AppBundle\Env\ScanAndCopy;
class Env extends Command
{

    public function __construct()
    {

        parent::__construct();

    }

    protected function configure()
    {
        $this
            ->setName('app:env')
            ->setDescription('Replace env Command.');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        
        $scanAndCopy = new ScanAndCopy();
        
        $scanAndCopy->process();
        
    }
}