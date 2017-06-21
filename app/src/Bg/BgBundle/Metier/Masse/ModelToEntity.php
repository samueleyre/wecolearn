<?php

namespace Bg\BgBundle\Metier\Masse;

use Bg\BgBundle\Model\Masse as Model;
use Bg\BgBundle\Entity\Masse;
use Bg\BgBundle\Entity\Programmation;

class ModelToEntity {

	public function convert( Model $model ) {

	    $masse = new Masse();
        $masse->name = $model->name;

        for($i=1;$i<=$model->totalNumberProgrammation;$i++)
        {
            foreach( $model->blogs as $blog ) 
            {

                
                $programmation = new Programmation();
                $programmation->setMasse( $masse);
                
                // map all the common properties of model and programmation
                $refModel = new \ReflectionClass( $model);
                $refProgrammation = new \ReflectionClass( $programmation);

                foreach( $refModel->getProperties( \ReflectionProperty::IS_PUBLIC ) as $publicPropModel ) {
                    foreach( $refProgrammation->getProperties( \ReflectionProperty::IS_PUBLIC ) as $publicPropProgrammation ) {

                            if( ( $prop = $publicPropModel->getName() ) === $publicPropProgrammation->getName() ) {
                                syslog( LOG_ERR, $prop );
                                $programmation->$prop = $model->$prop;
                            }

                    }
                }

                $programmation->idClient = $model->getClient()->getId();

                $programmation
                	->neutralSentenceNumber = 
                		rand(
                			$model->neutralSentenceNumberMin,
                			$model->neutralSentenceNumberMax
                		)
                	;
                
                $programmation
                	->anchorPosition = 
                			rand(
                				1,
                				$programmation->neutralSentenceNumber
                			)
                	   ;
                $programmation->idBlog =  $blog->getId();

            }
		}

        return $masse;
	}
}