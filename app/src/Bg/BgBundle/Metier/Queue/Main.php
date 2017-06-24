<?php

namespace Bg\BgBundle\Metier\Queue;

class Main {
    
    // tic of one hour 
    // each call rewrite the queue
    protected $unUsedProgrammation = [];
    protected $freshlyAdded = [];

    protected $queue = [];

    protected $model;

    public function __construct( $idClient, $logger, $em ) {
        $this->repository =  
            new \Bg\BgBundle\Repository\ProgrammationRepository( $em );
        $this->logger = $logger;
        $this->idClient = $idClient;
        $this->init();

    }

    private function init() {
        $this->setNewCommersAndRefreshUnUsedProgrammation();
        $this->refreshQueue();
        
    }
    
    /**
     * @return array();
     */ 
    public function tic() {
        // deplace le pointeur d'une heure ( minor le rand )
        // vide ceux deja passé
        // recupere les nouveaux
        // les place au bon endroit dans la pile
        // return un array des
        $this->init();
        return $this->depile();
    }

    public function count() {
        return count($this->queue);
    }

    protected function findNewUnUsedProgrammation() {
        $programmations = $this->repository->fetchUnUsedForClient( $this->idClient );
        $ret = array();
        foreach($programmations as $prog) {
            if( false === array_search($prog->getId(),$this->unUsedProgrammation)) {
                $ret[] = $prog->getId();
            }
        }
        return $ret;
    }

    protected function setNewCommersAndRefreshUnUsedProgrammation() {
        $this->freshlyAdded = $this->findNewUnUsedProgrammation();
        $this->unUsedProgrammation = array_merge($this->unUsedProgrammation,$this->freshlyAdded);
        
    }

    protected function refreshQueue() {
        foreach($this->freshlyAdded as $programmation_id) {
            $this->putProgrammationInQueue($programmation_id);
        }
    }

    protected function putProgrammationInQueue($id) {
        //echo sprintf("put programmation %d in queue \n", $id);
        $prog = $this->repository->fetchById($id);
        $pause = $prog->pause;
        $samePauseLastIndex = $this->whereIsLastSameTime($pause);
        $t = 1;
        foreach( $this->queue as $index => $array_prog ) {
            if(false === $samePauseLastIndex ) {
                if($t == $pause) {
                    if(is_array($this->queue[$index])) {
                        $this->queue[$index][] = $prog;
                    } else {
                        $this->queue[$index] = array($prog);
                    }    
                    return $this;
                }
                $t++;
            } else if (false !== $samePauseLastIndex && $index > $samePauseLastIndex) {
                if($t==$pause) {
                    if(is_array($this->queue[$index])) {
                        $this->queue[$index][] = $prog;
                    } else {
                        $this->queue[$index] = array($prog);
                    }
                    return $this;
                }
                $t++;
            }         
        }
        
        for($i=$t;$i<=$pause;$i++) {
            $add = array();
            if($i==$pause) {
                $add = array($prog);
            }
            $this->queue[] = $add;
        }
        return $this;
    }

    protected function whereIsLastSameTime($pause) {
        $ret = false;
        foreach($this->queue as $index => $progs) {
            foreach($progs as $prog) {
                if( $prog->pause ==$pause) {
                    $ret = $index;
                }
            }
        }
        return $ret;
    }

    protected function depile() {
        $progs = array_shift($this->queue);
        $this->removeUsedProgrammation($progs);
        return $progs;
    }

    protected function removeUsedProgrammation( $progs ) {
        if( is_array( $progs ) ) {
            foreach($progs as $prog) {
                foreach( $this->unUsedProgrammation as $index =>$id_prog) {
                    if($prog->getId() == $id_prog) {
                        unset($this->unUsedProgrammation[$index]);
                    }
                }
            }
        }
    }

    public function column() {
        $ret = [];
        foreach($this->queue as $pause => $progs) {
            $ret[$pause] = $this->programmationsToString( $progs );
        }

        return $ret;
    }

    private function programmationsToString( $progs ) {
        
        $model = new \OP\Model\Programmation();
        $ret = '';
        if(0 == count( $progs)) {
            $ret = '[ empty ]';
        } else {
            foreach( $progs as $prog ) {
                
                
                /*
                $sql = sprintf('SELECT blog.name as blog_name, client.name as client_name , programmation.id as id FROM programmation LEFT JOIN blog ON blog.id = idBlog LEFT JOIN client ON client.id = idClient WHERE programmation.id  = %d ', $prog['id']);
                $infoProg = $model->getRowFromQuery( $sql );
                */
                //$ret .= sprintf('[ client : \"%s\", blog : \"%s\" ]', $infoProg['client_name'], $infoProg['blog_name']) . "\n";
                $ret .= sprintf("[ %d ]", $prog->getId());
            }
        }
        return $ret;
    }

    private function dump_queue($queue) {
        $ret = [];
        foreach($queue as $pause => $progs) {
            $sep = '';
            foreach($progs as $prog ) {
                $ret[$pause].= $sep.$prog['id'];
                $sep = ';';
            }
        }
        var_dump($ret);
    }
}
