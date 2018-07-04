<?php

namespace WcBundle\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;
use WcBundle\Entity\Message;
use Doctrine\ORM\EntityManager;


class SendReminder extends Command
{

  private $em;
  private $emailService;
  private $messageService ;

  public function __construct(EntityManager $em, $emailService, $messageService )
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
          ->setData(5,
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
