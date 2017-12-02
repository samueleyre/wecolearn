<?php

namespace AppBundle\Pagination;

class PaginationQuery {

	public $page;
	public $perPage;
	public $disabled;
	public $count;

	public function __construct( $page, $perPage, $disabled = false ) {

		//syslog(LOG_ERR, $perPage);

		$this->page = $page;
		$this->perPage = $perPage;
		$this->disabled = $disabled;
	}

	public function getHeader() {
		$disabled = $this->disabled?'true':'false';
		return sprintf('page=%d perPage=%d maxPage=%d disabled=%s', $this->page , $this->perPage , $this->maxPage(), $disabled );
	}

	public function offset() {
		$ret = $this->perPage * ( $this->page - 1 );
		if( $ret < 0 ) $ret = 0;
		if( $this->page > $this->maxPage() && $this->maxPage() > 0 ) $ret = $this->perPage * ( $this->maxPage() - 1 );
		return $ret;
	}

	public function size() {
		return $this->perPage;
	}

	public function maxPage() {
		$ret = $this->perPage>0?ceil( $this->count / $this->perPage ):0;
		return $ret;
	}
}
