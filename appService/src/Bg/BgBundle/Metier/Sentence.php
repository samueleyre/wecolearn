<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 08/10/14
 * Time: 17:06
 */

namespace Bg\BgBundle\Metier;


class Sentence {

    protected $sentence;

    public function __construct($sentence)
    {
        $sentence = str_replace("\t",'',$sentence);
        $sentence = str_replace("\r",'',$sentence);
        $this->sentence = str_replace("\n",'',$sentence);
    }

    public function explode(){
        $tab   = preg_split("#(\.)|(!)|(\?)#",$this->sentence);
        $return = array();
        $tab = $this->replaceEtc($tab);
        $tab = $this->replaceNumber($tab);
        $tab = $this->replace3PetitsPoints($tab);
        foreach($tab as $sentence){
            $return = array_merge($return,$this->petitPoints($sentence));
        }
        return $this->addPointOnTrimmedData($this->trim($return));

    }

    protected function trim($tab)
    {
        $return = array();
        foreach($tab as $row)
        {
            if(trim($row) != '')
            {
                $return[]= $row = trim($row);

            }
        }
        return $return;
    }

    protected function addPointOnTrimmedData($tab){
        $return = array();
        foreach($tab as $row)
        {
            if(preg_match("#\.\.\.$#",$row))
            {
                $return[]= $row;
            }else
            {
                $return[]= $row.'.';
            }
        }
        return $return;
    }

    protected function petitPoints($sentence)
    {
        $tab = explode('...',$sentence);
        if(count($tab)>1)
        {
           $index = 0;
           while($index < count($tab))
           {
               if(isset($tab[$index+1]) && isset($tab[$index]))
               {
                   if( (trim($tab[$index+1]) != '') && preg_match('#^[a-z]#',trim($tab[$index+1])))
                   {
                       $tab[$index] = $tab[$index]. '...'.$tab[$index+1];
                       unset($tab[$index+1]);
                       $index = $index - 1;
                       $return = array();
                       foreach($tab as $row)
                       {
                           $return[]=$row;
                       }
                       $tab = $return;

                   }
               }
               $index++;

           }
           foreach($tab as $index=>$row)
           {
               if($index <(count($tab)-1))
               {
                   $tab[$index].= '...';
               }
           }
        }
        return $tab;
    }

    protected function replace3PetitsPoints($tab)
    {
        $index = 0;
        while($index <count($tab))
        {
            if(isset($tab[$index+1]) && isset($tab[$index+2]) && isset($tab[$index]))
            {
                if((trim($tab[$index+1]) == '' )&& (trim($tab[$index+2]) == '') && isset($tab[$index+3])){
                    $tab[$index].= '...'.$tab[$index+3];
                    unset($tab[$index+1]);
                    unset($tab[$index+2]);
                    unset($tab[$index+3]);
                    $index = $index - 1;
                    $return = array();
                    foreach($tab as $row)
                    {
                        $return[]=$row;
                    }
                    $tab = $return;
                }
            }
            $index++;

        }
        return $tab;
    }

    protected function replaceEtc($tab) {
        $index = 0;
        while($index < count($tab)) {
            if(preg_match('#etc$#', $tab[$index]) && preg_match('#^,#',$tab[$index+1])
                && isset($tab[$index+1])
            ) {
                $tab[$index].= '.'.$tab[$index+1];
                unset($tab[$index+1]);
                $index = $index - 1;
                $return = array();
                foreach($tab as $row) {
                    $return[] = $row;
                }
                $tab = $return;
            }
            $index ++;
        }
        return $tab;
    }

    protected function replaceNumber($tab) {
        $index = 0;
        while($index < count($tab)) {
            if(preg_match('#[0-9]+$#',$tab[$index]) && preg_match('#^[0-9]+#', $tab[$index+1])
                && isset($tab[$index+1])
            ) {
                $tab[$index].= '.'.$tab[$index+1];
                unset($tab[$index+1]);
                $index = $index - 1;
                $return = array();
                foreach($tab as $row) {
                    $return[] = $row;
                }
                $tab = $return;
            }
            $index ++;
        }
        return $tab;
    }
}