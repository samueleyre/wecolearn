<?php

namespace Bg\BgBundle\Subscriber;

use Bg\BgBundle\Entity\Phrase; 

use Doctrine\Common\Annotations\AnnotationReader;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Doctrine\Common\EventSubscriber;



class PhraseSubscriber implements EventSubscriber {


	public function preUpdate( PreUpdateEventArgs $event ) {

		if($event->getEntity() instanceof Phrase) {
			$notChangingFields = ['count','used'];
			foreach($event->getEntityChangeSet() as $changedField => $arg ) {
				if(in_array($changedField, $notChangingFields)) {
					$event->setNewValue( 
							$changedField,
							$event->getOldValue($changedField) 
						)
					;
					$setter = 'set'.ucfirst($changedField);
					$event->getEntity()->$setter($event->getOldValue($changedField));
				}
			}
		}
	}

	public function getSubscribedEvents()
    {
        return array(
            Events::preUpdate,
        );
    }

}