<?php

namespace Bg\BgBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="blogState")
 */
class BlogState {
    
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="integer",name="state")
     */
    public $state=0;

    /**
     * @ORM\Column(type="text",name="states")
     */
    public $states;

    /**
     * @ORM\Column(type="integer",name="idBlog")
     */
    public $idBlog;

    public function __construct() {
    	$this->states = serialize([]);
    }

    public function getId() {
    	return $this->id;
    }

    public function setIdBlog( $idBlog ) {
    	$this->idBlog = $idBlog;
    }

    public function addState( array $state ) {
    	$date = array_keys($state)[0];
    	$state = $state[$date];
    	$this->state = $state;
    	$states = $this->getStates();
    	$states[$date] = $state;
    	$this->setStates($states);

    }

    protected function getStates() {
    	return unserialize($this->states);
    }

    protected function setStates( $states ) {
    	$this->states = serialize( $states );
    }
}