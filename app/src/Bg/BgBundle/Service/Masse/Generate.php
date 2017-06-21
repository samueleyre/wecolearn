<?php

namespace Bg\BgBundle\Service\Masse;

use Bg\BgBundle\Model\Masse as Model;
use Bg\BgBundle\Entity\Masse;
use Bg\BgBundle\Entity\Programmation;

class Generate {

	public function fromModel( Model $model ) {

	    $masse = new Masse();
        $masse->name = $model->name;

        for($i=1;$i<=$model->totalNumberProgrammation;$i++)
        {
            foreach( $model->blogs as $blog ) 
            {

                
                $programmation = new Programmation();
                $programmation->masse =  $masse ;
                
                $refModel = new \ReflectionClass( $model);
                $refProgrammation = new \ReflectionClass( $programmation);

                foreach( $refModel->getProperties( \ReflectionProperty::IS_PUBLIC ) as $publicPropModel ) {
                    foreach( $refProgrammation->getProperties( \ReflectionProperty::IS_PUBLIC ) as $publicPropProgrammation ) {

                            if( ( $prop = $publicPropModel->getName() ) === $publicPropProgrammation->getName() ) {
                                $programmation->$prop = $model->$prop;
                            }

                    }
                }

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
                $masse->programmations->add( $programmation );

            }
		}

        return $masse;
	}
}