<?php

namespace App\Command;

use App\Services\Chat\Entity\Message;
use App\Services\Chat\Service\MessageService;
use App\Services\User\Entity\User;
use Shapecode\Bundle\CronBundle\Annotation\CronJob;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @CronJob("0 12 * * *")
 * every day at 12 am
 */
class WelcomeNewMembers extends Command
{

    private EntityManagerInterface $em;
    private MessageService $messageService;
    private string $environment;

    public function __construct( EntityManagerInterface $em, MessageService $messageService, string $environment)
    {

        $this->em = $em;
        $this->messageService = $messageService;
        $this->environment = $environment;
        parent::__construct();

    }

    protected function configure()
    {
        $this
            ->setName('app:welcomeNewMembers')
            ->setDescription('admin ( samuel eyre ) welcomes new members at 12 am');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {

        $newMembers = $this->em
            ->getRepository(User::class)
            ->getNewUsers();

        $admin = null;

        $searchingAdmins = $this->em->getRepository(User::class)->findBy(['firstName'=>'Samuel']);
        foreach($searchingAdmins as $searchingAdmin) {
            if ($searchingAdmin->hasRole('ROLE_ADMIN')) {
                $admin = $searchingAdmin;
            }
        }

        if (!$admin) {
            syslog(LOG_ERR, "could not find main admin in database !");
            exit();
        }

        $memberIndex = 0;
        foreach ($newMembers as $newMember) {

//            limit emails on staging
            if ($this->environment === 'staging' && $memberIndex > 0) {
                break;
            }

            $id = $newMember->getId();

            if ($newMember->hasRole('ROLE_ADMIN')) {
                continue;
            }

            $hasReceivedContactFromAdmin = false;

            $messages = $newMember->getReceivedMessages();
            foreach ($messages as $message) {
                // if sender is admin
                if ($message->getSender()->hasRole('ROLE_ADMIN')) {
                    $hasReceivedContactFromAdmin = true;
                }
            }

            $welcomeMessage = new Message();
            $welcomeMessage->setSender($admin);
            $welcomeMessage->setReceiver($newMember);
            $firstName = $newMember->getFirstname();
            $welcomeMessage->setMessage("<p>Bienvenue $firstName !<br>N'hésites pas à me poser des questions ici, et bon apprentissage ! 😀 </p>");

            if (!$hasReceivedContactFromAdmin) {
                $this->messageService->processNewMessage($welcomeMessage);
            }

            syslog(LOG_INFO, "welcomed user $id");

            $memberIndex++;
        }
    }
}
