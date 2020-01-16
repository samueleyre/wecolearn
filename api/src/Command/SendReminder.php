<?php

namespace App\Command;

use App\Services\Chat\Service\MessageService;
use Psr\Log\LoggerInterface;
use Shapecode\Bundle\CronBundle\Annotation\CronJob;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;
use App\_Chat\DomainModel\Message\Message;
use Doctrine\ORM\EntityManager;
use App\Services\Chat\Constant\EmailConstant;
use Doctrine\ORM\EntityManagerInterface;
use App\Services\Chat\Service\EmailService;


/**
 * @CronJob("0 16 * * *")
 * Will be executed every day at 4 pm
 */
class SendReminder extends Command
{

  private $em;
  private $emailService;
  private $messageService ;
  private $logger;

  public function __construct(EntityManagerInterface $em, EmailService $emailService, MessageService $messageService, LoggerInterface $logger )
  {

    $this->em = $em;
    $this->emailService = $emailService;
    $this->messageService  = $messageService ;
    $this->logger = $logger;
    parent::__construct();

  }

    protected function configure()
    {
        $this
            ->setName('app:sendReminder')
            ->setDescription('Send Messages');

    }

    protected function execute (InputInterface $input, OutputInterface $output) {

      $this->logger->info('In send reminder');

      $MessagesSortedClients = $this->em
        ->getRepository(Message::class)
        ->getUnReadMessagesByUser();

      foreach ($MessagesSortedClients as $clientId => $client) {
        $messages = "";
        $i = 0;
        while ($i <= 2 && isset($client["messages"][$i])):
          $MESSAGE = $client["messages"][$i]->getMessage();
          $FIRSTNAME = $client["messages"][$i]->getSender()->getFirstname();
          $TIME = $client["messages"][$i]->getCreated()->format('H:i');
          $DATE = $client["messages"][$i]->getCreated()->format('d-m-Y');

          $messages.= '<p><b>'.$FIRSTNAME.'</b> : "'.$MESSAGE.'", le '.$DATE.' à '.$TIME.'</p><br>';

          $i++;


        endwhile;

        $this->messageService->setReminderDate($clientId);

//        $output->writeln( $client["email"]);
//        $output->writeln( json_encode($messages));
//        $output->writeln( $client["firstname"]);
        $return = $this->emailService
          ->setData(EmailConstant::$Ids["MESSAGE_NOTIFS"],
            [
              "MESSAGES" => $messages,
              "FIRSTNAME"=> $client["firstname"],
              "USERNAME"=> $client["firstname"],
            ],
            $client["email"]
          )
          ->sendEmail();

//        $output->writeln( json_encode($return));
//        $output->writeln( "-------------------");


      }
    }
}
