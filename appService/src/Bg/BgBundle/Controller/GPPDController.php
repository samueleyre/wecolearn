<?php

namespace Bg\BgBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;



class GPPDController extends Controller
{
    
    protected $entityRef;

    public function optionAction()
    {
        return [];
        
    } 
    
    public function getAction()
    {
        
        return $this
            ->get('gppd.service')
            ->setEntityRef( $this->entityRef )
            ->get();
		
	}

    public function postAction( $entity )
    {
        
        return 
            $this
                ->get('gppd.service')
                ->setEntityRef( $this->entityRef )
                ->post( $entity )
                ->get();
        
    }

    public function patchAction( $entity )
    {
        return 
            $this
                ->get('gppd.service')
                ->setEntityRef( $this->entityRef )
                ->patch( $entity )
                ->get();
    }
    
    public function deleteAction( $id )
    {
        return $this
                ->get('gppd.service')
                ->setEntityRef( $this->entityRef )
                ->delete( $id )
                ->get();
    }
}
