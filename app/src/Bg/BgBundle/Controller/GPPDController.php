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
    
    public function getAction($filter = [])
    {
        
        return $this
            ->get('gppd.service')
            ->setEntityRef( $this->entityRef )
            ->get($filter);
		
	}

    public function postAction( $entity, $filter = [] )
    {
        
        return 
            $this
                ->get('gppd.service')
                ->setEntityRef( $this->entityRef )
                ->post( $entity )
                ->get( $filter );
        
    }

    public function patchAction( $entity, $filter = [] )
    {
        return 
            $this
                ->get('gppd.service')
                ->setEntityRef( $this->entityRef )
                ->patch( $entity )
                ->get( $filter );
    }
    
    public function deleteAction( $id, $filter = [] )
    {
        return $this
                ->get('gppd.service')
                ->setEntityRef( $this->entityRef )
                ->delete( $id )
                ->get( $filter );
    }
}
