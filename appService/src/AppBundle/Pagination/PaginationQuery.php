<?php

namespace AppBundle\Pagination;

class PaginationQuery {

	public $page;
	public $perPage;
	public $disbled;
	public $count;
	
	public function __construct( $page, $perPage, $disabled = false ) {

		//syslog(LOG_ERR, $perPage);

		$this->page = $page;
		$this->perPage = $perPage;
		$this->disabled = $disabled;
	}

	public function getHeader() {
		return sprintf('page=%d perPage=%d maxPage=%d', $this->page , $this->perPage , $this->maxPage());
	}

	public function offset() {
		$ret = $this->perPage * ( $this->page - 1 );
		if( $ret < 0 ) $ret = 0;
		if( $this->page > $this->maxPage()) $ret = $this->perPage * ( $this->maxPage() - 1 );
		return $ret;
	}

	public function size() {
		return $this->perPage;
	}

	public function maxPage() {
		return ceil( $this->count / $this->perPage );
	}
}