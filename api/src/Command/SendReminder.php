<?php

namespace App\Command;

use App\Services\Chat\Entity\Message;
use App\Services\Chat\Service\MessageService;
use App\Services\Core\Constant\FrontNavConstant;
use Oro\ORM\Query\AST\Platform\Functions\Mysql\Date;
use Shapecode\Bundle\CronBundle\Annotation\CronJob;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\Services\Chat\Constant\EmailConstant;
use Doctrine\ORM\EntityManagerInterface;
use App\Services\Shared\Service\EmailService;


/**
 * @CronJob("*\/60 * * * *")
 * Will be executed every hour
 */
class SendReminder extends Command
{

    private EntityManagerInterface $em;
    private EmailService $emailService;
    private MessageService $messageService;
    private string $environment;
    private string $host;

    public function __construct(EntityManagerInterface $em, EmailService $emailService, MessageService $messageService, string $environment, string $host)
    {

        $this->em = $em;
        $this->emailService = $emailService;
        $this->messageService = $messageService;
        $this->environment = $environment;
        $this->host = str_contains($host, 'localhost') ? "http://$host" : "https://$host";
        parent::__construct();

    }

    protected function configure()
    {
        $this
            ->setName('app:sendReminder')
            ->setDescription('Send Messages');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

//      get messages sent at a hour ago, not yet read and not yet notified.
        $MessagesSortedClients = $this->em
            ->getRepository(Message::class)
            ->getUnReadMessagesByUser();

        $linkToDiscussions = $this->host . '/' . FrontNavConstant::$Nav['discussion'];
        $linkToSettings = $this->host . '/' . FrontNavConstant::$Nav['settings'];

        $clientIndex = 0;
        foreach ($MessagesSortedClients as $clientId => $client) {

//            limit emails on staging
            if ($this->environment === 'staging' && $clientIndex > 0) {
                break;
            }

            $messages = "";
            $preheader = "";
            $i = 0;
            while ($i <= 2 && isset($client["messages"][$i])):
                $MESSAGE = strip_tags($client["messages"][$i]->getMessage());
                $FIRSTNAME = $client["messages"][$i]->getSender()->getFirstname();
                $TIME = $client["messages"][$i]->getCreated()->format('H\hi');
                $DATE = $client["messages"][$i]->getCreated()->format('d M Y');
                $messages .= '<p><b>' . $FIRSTNAME . '</b></p><p style="font-size:20px; padding: 5px 0">' . $MESSAGE . '</p><p style="font-size:10px">' . $DATE . ' à ' . $TIME . '</p><br>';
                if ($i === 0) {
                    $preheader .= $FIRSTNAME . ': ' . $MESSAGE;
                }
                $i++;
            endwhile;

            $this->messageService->setReminderDate($clientId);

            $this->emailService
                ->setData(EmailConstant::$Ids["MESSAGE_NOTIFS"],
                    [
                        "MESSAGES" => $messages,
                        "FIRSTNAME" => $client["firstname"],
                        "USERNAME" => $client["firstname"],
                        "DISCUSSION_LINK" => $linkToDiscussions,
                        "PARAMETERS_LINK" => $linkToSettings,
                        "PREHEADER" => $preheader,
                    ],
                    $client["email"]
                )
                ->sendEmail();

            $clientIndex++;
        }
    }
}
