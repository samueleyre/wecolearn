<?php

namespace App\Command;

use App\Services\Chat\Entity\Message;
use App\Services\Chat\Service\MessageService;
use Shapecode\Bundle\CronBundle\Annotation\CronJob;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\Services\Chat\Constant\EmailConstant;
use Doctrine\ORM\EntityManagerInterface;
use App\Services\Chat\Service\EmailService;


/**
 * @CronJob("*\/60 * * * *")
 * Will be executed every hour
 */
class SendReminder extends Command
{

  private $em;
  private $emailService;
  private $messageService ;

  public function __construct(EntityManagerInterface $em, EmailService $emailService, MessageService $messageService )
  {

    $this->em = $em;
    $this->emailService = $emailService;
    $this->messageService  = $messageService ;
    parent::__construct();

  }

    protected function configure()
    {
        $this
            ->setName('app:sendReminder')
            ->setDescription('Send Messages');
    }

    protected function execute (InputInterface $input, OutputInterface $output) {

//      get messages sent at a hour ago, not yet read and not yet notified.
      $MessagesSortedClients = $this->em
        ->getRepository(Message::class)
        ->getUnReadMessagesByUser();

      foreach ($MessagesSortedClients as $clientId => $client) {

        $messages = "";
        $i = 0;

        while ($i <= 2 && isset($client["messages"][$i])):
          $MESSAGE = strip_tags($client["messages"][$i]->getMessage());
          $FIRSTNAME = $client["messages"][$i]->getSender()->getFirstname();
          $TIME = $client["messages"][$i]->getCreated()->format('H:i');
          $DATE = $client["messages"][$i]->getCreated()->format('d-m-Y');
          $messages.= '<p><b>'.$FIRSTNAME.'</b> : "'.$MESSAGE.'", le '.$DATE.' à '.$TIME.'</p><br>';
          $i++;
        endwhile;

        $this->messageService->setReminderDate($clientId);

        $this->emailService
          ->setData(EmailConstant::$Ids["MESSAGE_NOTIFS"],
            [
              "MESSAGES" => $messages,
              "FIRSTNAME"=> $client["firstname"],
              "USERNAME"=> $client["firstname"],
            ],
            $client["email"]
          )
          ->sendEmail();

      }
    }
}
