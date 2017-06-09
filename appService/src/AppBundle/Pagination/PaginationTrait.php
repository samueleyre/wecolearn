<?php

namespace AppBundle\Pagination;

trait PaginationTrait {
	
	private $paginationQuery;

	public function setPaginationQuery(PaginationQuery $paginationQuery ) {
		$this->paginationQuery = $paginationQuery;
	}

	public function getPaginationQuery() {
		return $this->paginationQuery;
	}
}