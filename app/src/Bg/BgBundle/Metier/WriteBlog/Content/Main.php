<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 29/09/14
 * Time: 11:38
 */

namespace Bg\BgBundle\Metier\WriteBlog\Content;


use Bg\BgBundle\Entity\Ancre;
use Bg\BgBundle\Entity\Clef;
use Bg\BgBundle\Entity\Neutre;

use Bg\BgBundle\Metier\Command\FetchEntity;
use Bg\BgBundle\Metier\Command\UpdateEntity;

class Main {

    protected $log;

    protected $idLanguageTitle;
    protected $neutralSentenceNumber;
    protected $anchorPosition;
    protected $idClient;
    protected $isBlank;

    protected $content;
    protected $title;

    protected $idPraseClef;
    protected $cache;
    protected $phraseClefCall = 0;

    protected $commandHandler;

    const TITLE_ONLY = 0;
    const TITLE_KEY_SENTENCE = 1;
    const TITLE_KEY_SENTENCE_AND_TITLE = 2;


    public function __construct(
                                $em,
                                $commandHandler,
                                $idLanguageTitle,
                                $neutralSentenceNumber,
                                $anchorPosition,
                                $idClient,
                                $isBlank,
                                $titleOption = 0
                                #0 pour titre
                                #1 pour phrase clef
                                #2 pour phrase clef et titre
                            )
    {

            #logger
            //$this->log->pushHandler(new StreamHandler('/var/log/RunProgrammation/log', Logger::INFO));
            //$this->log->info('Write blog constructor');
            $this->em = $em;
            $this->commandHandler = $commandHandler;
            $this->cache = new Cache();
            $this->idLanguageTitle = $idLanguageTitle;
            $this->idClient=$idClient;
            $this->neutralSentenceNumber=$neutralSentenceNumber;
            $this->anchorPosition=$anchorPosition;
            $this->isBlank=$isBlank;

            $this->setTitle($titleOption);
            $this->setContent();
    }

    protected function getRandomRowAndSetUsed( $model,$idLanguage,$idClient = null, $useCache = false )
    {

            
        $cacheKey = get_class($model).$idLanguage.(isset($idClient)?'with_client':'without_client');
        
        if($useCache) {
            return $this->cache->get($cacheKey);
        }
        $cond = array('used'=>0,'idLanguage'=>$idLanguage);
        if(isset($idClient))
        {
            $cond['idClient'] = $idClient;
        }
            
        $fetch = new FetchEntity( $model, $cond , $this->em );
        
        $this->commandHandler->handle( $fetch);
        
        $row = $fetch->getResponse();
        //$fetch = null;
        
        if(!isset($row ))
        {
            $condUpdate = $cond;
            unset($condUpdate['used']);
            $updateCommand = new UpdateEntity( $model,['used'=>0],$condUpdate );
            $this->commandHandler->handle( $updateCommand );
            $fetchCommand = new FetchEntity( $model, $cond, $this->em );
            $this->commandHandler->handle( $fetchCommand);
            $row = $fetchCommand->getResponse();
        }

        //mise à jour du compteur
        if( isset($idClient) && $model instanceof Clef ) {
            $this->idPhraseClef = $row->getId();
        }
        
        $this->cache->put($cacheKey,clone $row);
        
        $count = $row->getCount();
        $count++;
        
            
        $updateCommande = new UpdateEntity(
                $model, 
                ['used'=>1,'count'=>$count], 
                ['id'=>$row->getId()]
            )
        ;
        $this->commandHandler->handle($updateCommande);
        if(!isset($row)) {
            throw new \Exception(sprintf('Unable to get random element from model %s', get_class($model) ) );
        }
        
        
        
        return $row;
    }

    protected function setTitle($option)
    {
        $entity = null;
            
        if(self::TITLE_ONLY == $option || self::TITLE_KEY_SENTENCE_AND_TITLE == $option)
        {
            $model = new \Bg\BgBundle\Entity\Titre();
            $entity = $this->getRandomRowAndSetUsed($model,$this->idLanguageTitle);
        }
        if($option == self::TITLE_KEY_SENTENCE || $option == self::TITLE_KEY_SENTENCE_AND_TITLE) {
            $clef = $this->getClefTitle($this->idLanguageTitle,$this->idClient );
        }
        switch($option) {
            case self::TITLE_ONLY: 
                $this->title = $entity->getPhrase();
                break;
            case self::TITLE_KEY_SENTENCE : 
                $this->title = $clef;
                break;
            case self::TITLE_KEY_SENTENCE_AND_TITLE : 
                $this->title = $clef .' : '.$entity->getPhrase();
                break;
        }
        if($entity) {
            $this->em->detach( $entity );
        }

    }

    protected function getClef($idLanguage,$idClient,$isBlank){
        $rowAncre = $this->getRandomRowAndSetUsed(new Ancre(),$idLanguage);
        $useCache = $this->phraseClefCall>0;
        $rowClef = $this->getRandomRowAndSetUsed(new Clef(),$idLanguage,$idClient,$useCache);
        $phrase = $rowAncre->getPhrase();
        $clef = $rowClef->getPhrase();
        $url = $rowClef->getUrl();
        $blank = '';
        if($isBlank){
            $blank = ' target="_blank" ';
        }
        $this->em->detach( $rowAncre );
        $this->em->detach( $rowClef);
        $link = sprintf('<a href="%s" %s>%s</a>',$url,$blank,$clef);
        return str_replace('[XXXXXX]',$link,$phrase);
    }

     protected function getClefTitle($idLanguage,$idClient){
        $rowClef = $this->getRandomRowAndSetUsed(new Clef(),$idLanguage,$idClient);
        
        $this->phraseClefCall++;


        $phrase = $rowClef->getPhrase();
        $this->em->detach( $rowClef);

        
        return 
             $phrase
        ;
    }


    protected function setContent()
    {
        $tab = array();
        $neutralModel = new Neutre();
        for($i=1;$i<= $this->neutralSentenceNumber;$i++)
        {
            $rowNeutral = $this->getRandomRowAndSetUsed($neutralModel,$this->idLanguageTitle);
            
            $tab[] = $rowNeutral->getPhrase();
            if($this->anchorPosition == $i)
            {
                $tab[] = $this->getClef($this->idLanguageTitle,$this->idClient,$this->isBlank);
            }
                
            $this->em->detach($rowNeutral);
            
            
        }
        $content = '';
        $space = '';
        foreach($tab as $phrase){
            $content .= $space.$phrase;
            $space = ' ';
        }
        $this->content = $content;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getContent(){
        return $this->content;
    }

    public function getIdPhraseClef()
    {
        return $this->idPhraseClef;
    }
} 
