<?php

namespace App\Command;

use App\Services\User\Entity\User;
use App\Services\User\Service\UserService;
use Shapecode\Bundle\CronBundle\Annotation\CronJob;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @CronJob("0 2 * * *")
 * every day at 2 am
 */
class RemoveDeletedUsers extends Command
{

    private $em;
    private $userService;

    public function __construct( EntityManagerInterface $em, UserService $userService)
    {

        $this->em = $em;
        $this->userService = $userService;
        parent::__construct();

    }

    protected function configure()
    {
        $this
            ->setName('app:removeDeletedUsers')
            ->setDescription('hard delete of soft deleted users');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $deletedUsers = $this->em
            ->getRepository(User::class)
            ->getDeletedUsers();

        foreach ($deletedUsers as $deletedUser) {
            $id = $deletedUser->getId();
            $this->em->remove($deletedUser);
            syslog(LOG_INFO, `deleted user $id`);
        }

        $this->em->flush();
    }
}
