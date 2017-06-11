<?php

namespace AppBundle\Pagination;


class Service {

	private $paginationQuery;

	public function setPaginationQuery( PaginationQuery $paginationQuery ) {
		$this->paginationQuery = $paginationQuery;
	}

	public function getPaginationQuery() {
		return $this->paginationQuery; 
	}
}