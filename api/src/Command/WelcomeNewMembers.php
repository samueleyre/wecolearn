<?php

namespace App\Command;

use App\Services\Chat\Entity\Message;
use App\Services\Chat\Service\MessageService;
use App\Services\User\Entity\User;
use App\Services\User\Service\UserService;
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

    private $em;
    private $messageService;

    public function __construct( EntityManagerInterface $em, MessageService $messageService)
    {

        $this->em = $em;
        $this->messageService = $messageService;
        parent::__construct();

    }

    protected function configure()
    {
        $this
            ->setName('app:welcomeNewMembers')
            ->setDescription('admin ( samuel eyre ) welcomes new members at 12 am');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $newMembers = $this->em
            ->getRepository(User::class)
            ->getNewUsers();

        foreach ($newMembers as $newMember) {

            $id = $newMember->getId();

            $hasReceivedContactFromAdmin = false;

            $messages = $newMember->getReceivedMessages();
            foreach ($messages as $message) {
                // if sender is admin
                if (array_search('ROLE_ADMIN', $message->getSender()->getRoles()) !== false) {
                    $hasReceivedContactFromAdmin = true;
                }
            }

            $searchingAdmins = $this->em->getRepository(User::class)->findOneBy(['firstname'=>'Samuel']);

            $admin = null;
            foreach($searchingAdmins as $searchingAdmin) {
                if (array_search('ROLE_ADMIN', $message->getSender()->getRoles()) !== false) {
                    $admin = $searchingAdmin;
                }
            }

            if (!$admin) {
                syslog(LOG_ERR, `could not find main admin in database !`);
                return;
            }

            $welcomeMessage = new Message();
            $welcomeMessage->setSender($admin);
            $welcomeMessage->setReceiver($newMember);
            $welcomeMessage->setMessage(`<p>Bienvenue ${$newMember->getFirstname()} !<br>N'hésites pas à me poser des questions ici, et bon apprentissage ! 😀 </p>`);

            if (!$hasReceivedContactFromAdmin) {
                $this->messageService->processNewMessage($welcomeMessage);
            }
            
            syslog(LOG_INFO, `welcomed user $id`);

        }
    }
}
