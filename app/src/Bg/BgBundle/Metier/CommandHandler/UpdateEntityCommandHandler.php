<?php

namespace Bg\BgBundle\Metier\CommandHandler;

use Bg\BgBundle\Metier\Command\UpdateEntity;

class UpdateEntityCommandHandler {

	private $em;

	public function __construct( $em ) {
		$this->em = $em;
	}

	public function handle(UpdateEntity $command ) {

		$this->_handle($command->getEntity(), $command->getValues(), $command->getConditions());
	}

	private function _handle( $entity , $values ,$conditions ) {

		$usage1 = memory_get_usage();
		$qb = $this->em->createQueryBuilder();
		$q = $qb->update(get_class($entity), 'e');
		$params = [];
		$index = 0;
		foreach( $values as $key => $value ) {
			$q->set('e.'.$key, '?'.$index);
			$params[$index] = $value;
			$index ++;
		}
		$cond = '';
		$sep = '';
		foreach( $conditions as $key => $value ) {
			
			$cond .= sprintf("%s e.%s = ?%s ", $sep , $key , $index );
			$sep = 'AND';
			$params[$index] = $value;
			$index ++;
		}
		$q
			->where($cond)
			->setParameters( $params )
			->getQuery()
			->execute()
		;
		$this->em->clear();
		$usage2 = memory_get_usage();
		
	}
}