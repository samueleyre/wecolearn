<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 29/09/14
 * Time: 11:38
 */

namespace BG\BgBundle\Metier\WriteBlog\Content;


use OP\Model\PhraseAncre;
use OP\Model\PhraseClef;
use OP\Model\PhraseNeutre;

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

    const TITLE_ONLY = 0;
    const TITLE_KEY_SENTENCE = 1;
    const TITLE_KEY_SENTENCE_AND_TITLE = 2;


    public function __construct($idLanguageTitle,
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
            $this->cache = new \OP\WriteBlog\Content\Cache();
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
        $data = $model->getRows($cond);
        if(count($data) == 0)
        {
            $condUpdate = $cond;
            unset($condUpdate['used']);
            $model->update(array('used'=>0),$condUpdate);
            $data = $model->getRows($cond);
        }
        //mise à jour du compteur
        $n = count($data);
        $rand = rand(0,$n-1);
        $row = $data[$rand];

        if( isset($idClient) && $model instanceof PhraseClef ) {
            $this->idPhraseClef = $row['id'];
        }
        $this->cache->put($cacheKey,$row);
        $count = $data[$rand]['count'];
        $count++;

        //mise a jour
        $model->update(array('used'=>1,'count'=>$count),array('id'=>$row['id']));
        if(!isset($row)) {
            throw new \Exception(sprintf('Unable to get random element from model %s', get_class($model) ) );
        }
        return $row;
    }

    protected function setTitle($option)
    {
        if(self::TITLE_ONLY == $option || self::TITLE_KEY_SENTENCE_AND_TITLE == $option)
        {
            $model = new \OP\Model\Titre();
            $row = $this->getRandomRowAndSetUsed($model,$this->idLanguageTitle);
        }
        if($option == self::TITLE_KEY_SENTENCE || $option == self::TITLE_KEY_SENTENCE_AND_TITLE) {
            $clef = $this->getClefTitle($this->idLanguageTitle,$this->idClient );
        }
        switch($option) {
            case self::TITLE_ONLY: 
                $this->title = $row['phrase'];
                break;
            case self::TITLE_KEY_SENTENCE : 
                $this->title = $clef;
                break;
            case self::TITLE_KEY_SENTENCE_AND_TITLE : 
                $this->title = $clef .' : '.$row['phrase'];
                break;
        }
    }

    protected function getClef($idLanguage,$idClient,$isBlank){
        $rowAncre = $this->getRandomRowAndSetUsed(new PhraseAncre(),$idLanguage);
        $useCache = $this->phraseClefCall>0;
        $rowClef = $this->getRandomRowAndSetUsed(new PhraseClef(),$idLanguage,$idClient,$useCache);
        $phrase = $rowAncre['phrase'];
        $clef = $rowClef['phrase'];
        $url = $rowClef['url'];
        $blank = '';
        if($isBlank){
            $blank = ' target="_blank" ';
        }
        $link = sprintf('<a href="%s" %s>%s</a>',$url,$blank,$clef);
        return str_replace('[XXXXXX]',$link,$phrase);
    }

     protected function getClefTitle($idLanguage,$idClient){
        $rowClef = $this->getRandomRowAndSetUsed(new PhraseClef(),$idLanguage,$idClient);
        
        $this->phraseClefCall++;

        
        return 
             $rowClef['phrase']
        ;
    }


    protected function setContent()
    {
        $tab = array();
        $neutralModel = new PhraseNeutre();
        for($i=1;$i<= $this->neutralSentenceNumber;$i++)
        {
            $rowNeutral = $this->getRandomRowAndSetUsed($neutralModel,$this->idLanguageTitle);
            $tab[] = $rowNeutral['phrase'];
            if($this->anchorPosition == $i)
            {
                $tab[] = $this->getClef($this->idLanguageTitle,$this->idClient,$this->isBlank);
            }
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
