<?php

namespace App\Command;

use App\Services\Tag\Entity\Tag;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;

class ResetCount extends Command
{
    private $em;

    public function __construct( EntityManagerInterface $em)
    {
        $this->em = $em;
        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('app:resetCount')
            ->setDescription('reset iteration count of tags');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $this->em
            ->getRepository(Tag::class)
            ->resetCount();

    }
}
