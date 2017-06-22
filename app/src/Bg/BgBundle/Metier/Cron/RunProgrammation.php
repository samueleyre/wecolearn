<?php
namespace Bg\BgBundle\Metier\Cron;

use Bg\BgBundle\Metier\Exception\Manager\UrlExceptionManager;
use Bg\BgBundle\Metier\Notification\Manager as NotificationManager;
use Bg\BgBundle\Metier\WriteBlog\Writer\WordPress;
use Bg\BgBundle\Metier\WriteBlog\Content\Main;
use Bg\BgBundle\Metier\Queue\QueueProvider;
use Bg\BgBundle\Repository\BlogRepository;

use AppBundle\Env\Manager as Env;


class RunProgrammation {
    

    protected $sleepCurrent;
    protected $sleepMin=5;
    protected $sleepMax=60;
    protected $log;
    protected $em;
    
    public function __construct( $logger, $em ) {
    
        $this->sleepCurrent = $this->sleepMin;
        $this->log = $logger;
        $this->em = $em;
        $this->NM = new NotificationManager( $logger );

    
    }

    protected function sleep() {
        
        $this->log->info(sprintf("sleep for %s", $this->sleepCurrent ));
        sleep($this->sleepCurrent);
        $this->sleepCurrent = ($this->sleepCurrent + $this->sleepMax)/2;
    } 

    

    public function go()
    {
        $blogRepository = new BlogRepository( $this->em );
        $queueProvider = new QueueProvider( $this->log, $this->em );
        $clientsProgs = $queueProvider->tic();
        while(count($clientsProgs) > 0 ) {
            foreach($clientsProgs as $clientName => $arrayProgs) {
                if( null !== $arrayProgs && count($arrayProgs) > 0 ) {


                    
                    #arrayProgs can be empty. for a certain time.
                    foreach( $arrayProgs as $rowProg ) { 
                            
                        
                            $blogRow = $blogRepository->findById($rowProg->idBlog);
                            $content = new Main(
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
                            
                            try { 
                                    
                                    $writter = new WordPress(
                                        $blogRow->url,
                                        $blogRow->login,
                                        $blogRow->pass
                                        )
                                    ;
                                    if($rowProg->isPage)
                                    {
                                        $writter->newPage($title,$contentText);
                                    }
                                    else
                                    {
                                        $writter->newPost($title,$contentText);
                                    }

                                    $this->log->info("Publication has been made for {$clientName} in blog with id {$idBlog}");
                                
                                } catch(\Exception $e ) {
                                    
                                    $EM = new UrlExceptionManager( $this->logger );
                                    try {
                                        
                                        $this->log->warning('Exception catched and processed');
                                        $EM->isException($e,$blogRow->url, $this );
                                    
                                    } catch(\Exception $e) {

                                        $this->log->info('Exception rejected');
                                        
                                        $this->NM->info($e);
                                        
                                        $rowProg->used = 1;
                                        $rowProg->time = new \Datetime();
                                        $rowProg->idPhraseClef = $idPhraseClef;
                                        $rowProg->isException = 1;

                                        $this->em->merge( $rowProg );
                                        $this->em->flush();
                                        
                                        $this->go();
                                        
                                    }

                                    
                            }
                            
                            $rowProg->used = 1;
                            $rowProg->time = new \Datetime();
                            $rowProg->idPhraseClef = $idPhraseClef;
                            
                            $this->em->merge( $rowProg );
                            $this->em->flush();
                                        
                            #sleep time between close publication
                            $sleepTime = rand(1,10);
                            $this->log->info("Sleep for {$sleepTime} before next publication\n");
                            sleep($sleepTime);
                    }

                } else {
                    $this->log->info("No programmations available yet for client {$clientName}, you have to wait a while");
                }
            
                $sleepTime = rand(1,10);
                $updatedTime = $updatedData['time'];
                $this->log->info("Sleep for {$sleepTime} after publishing for {$clientName} for blog : {$idBlog} at time {$updatedTime}\n");
                sleep($sleepTime);

            }    
            
            $sleepTime = rand($rowProg->pause - 30,$rowProg->pause + 30);
            if( Env::getEnv() < Env::PRODUCTION ) {
                $sleepTime = 300;
            }
            $this->log->info("Sleep for {$sleepTime} seconds before new tic\n");
            sleep($sleepTime);
            $clientsProgs = $queueProvider->tic();
        }
        $this->log->info('no more programations availables');
        return;
    }
    
}
