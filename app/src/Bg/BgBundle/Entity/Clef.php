<?php
namespace Bg\BgBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="phraseClef")
 */
class Clef extends Phrase {

	/**
     * @ORM\Column(type="integer",name="idClient")
     */
	protected $idClient;

	/**
     * @ORM\Column(type="string",name="url",length=255)
     */
	protected $url;

	public function getId() {
    	return $this->id;
    }

    public function setIdClient( $idClient ) {
    	$this->idClient = $idClient;
    	return $this;
    }

    public function getIdClient() {
    	return $this->idClient;
    }

    public function setUrl( $url ) {
    	$this->url = $url;
    	return $this;
    }

    public function getUrl() {
    	return $this->url;
    }
}