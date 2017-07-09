<?php

namespace AppBundle\Command;

use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Bg\BgBundle\Metier\Cron\Alive as CronAlive;
use Bg\BgBundle\Metier\WriteBlog\Writer\WordPress;
use Bg\BgBundle\Metier\WriteBlog\Content\Main;


use Bg\BgBundle\Metier\Recherche\Model\Recherche;

use Bg\BgBundle\Metier\Command\FetchEntity;
use Bg\BgBundle\Entity\Blog;

class Test extends Command
{
    private $logger;

    public function __construct(LoggerInterface $logger, $em, $commandBus )
    {
        
        //$this->alive = new CronAlive( $logger, $em , $commandBus );

        parent::__construct();

        $this->command = $commandBus;
        $this->em = $em;

    }

    protected function configure()
    {
        $this
            ->setName('app:test')
            ->setDescription('Test Command !');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        
        $blogs = 
            $this
                ->em
                ->createQuery("SELECT entity FROM BgBundle:Blog entity")
                ->getResult();


        
        /*
        $command = new FetchEntity( new Blog, ['id' =>  132 ]);
        $this->command->handle( $command);
        
        $blogRow = $command->getResponse()[0];


        $rowProg = new \Bg\BgBundle\Entity\Programmation();
        $rowProg->idLanguage = 1;
        $rowProg->idLanguageAnchor = 1;
        $rowProg->idLanguageNeutral = 1;
        $rowProg->idLanguageTitle = 1;
    
        $rowProg->neutralSentenceNumber = 4;
        $rowProg->anchorPosition = 1;
        $rowProg->idClient  = 4;
        $rowProg->isBlank = 1;
        $rowProg->titleOption = 0; // 0 titre seul , 1 prase clef, 2 =  clef : titre
        $rowProg->isPage = false;

        $content = new Main(
            $this->em,
            $this->command,
            $rowProg->idLanguageTitle,
            $rowProg->neutralSentenceNumber,
            $rowProg->anchorPosition,
            $rowProg->idClient,
            $rowProg->isBlank,
            $rowProg->titleOption
        );
        $title = $content->getTitle();
        $contentText = $content->getContent();
        $idPhraseClef = $content->getIdPhraseClef();
        */
        /*
        dump( $title );

        $writter = new WordPress(
            $blogRow->getUrl(),
            $blogRow->getLogin(),
            $blogRow->getPass()
            )
        ;
        if($rowProg->isPage)
        {
            $blogPageId = $writter->newPage($title,$contentText);
        }
        else
        {
            $blogPageId = $writter->newPost($title,$contentText);
        }

        dump( $blogPageId);
        */

    }
}