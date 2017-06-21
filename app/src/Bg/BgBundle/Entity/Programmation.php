<?php
namespace Bg\BgBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="programmation")
 */
class Programmation
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="integer",name="anchorPosition")
     */
    public $anchorPosition;

    /**
     * @ORM\Column(type="integer",name="anchorSentenceNumber")
     */
    public $anchorSentenceNumber;

    /**
     * @ORM\Column(type="integer",name="idClient")
     */
    public $idClient;
	
	/**
     * @ORM\Column(type="integer",name="idBlog")
     */
    public $idBlog;
    
    /**
     * @ORM\Column(type="integer",name="idLanguageAnchor")
     */
    public $idLanguageAnchor;

    /**
     * @ORM\Column(type="integer",name="idLanguageNeutral")
     */
    public $idLanguageNeutral;

    /**
     * @ORM\Column(type="integer",name="idLanguageTitle")
     */
    public $idLanguageTitle;
    
    /**
     * @ORM\Column(type="integer",name="idPhraseClef")
     */
    public $idPhraseClef;

	/**
     * @ORM\Column(type="integer",name="isBlank")
     */
    public $isBlank;

	/**
     * @ORM\Column(type="integer",name="isException")
     */
    public $isException;

	/**
     * @ORM\Column(type="integer",name="isPage")
     */
    public $isPage;

     /**
     * @ORM\ManyToOne(targetEntity="Bg\BgBundle\Entity\Masse", inversedBy="programmations")
     * @ORM\JoinColumn(name="idMasse", referencedColumnName="id")
     */
    public $masse;

    /**
     * @ORM\Column(type="string",name="name")
     */
    public $name;

    /**
     * @ORM\Column(type="integer",name="neutralSentenceNumber")
     */
    public $neutralSentenceNumber;

    /**
     * @ORM\Column(type="integer",name="pause")
     */
    public $pause;

    /**
     * @ORM\Column(type="datetime",name="time")
     */
    public $time;

    /**
     * @ORM\Column(type="integer",name="titleOption")
     */
    public $titleOption;

    /**
     * @ORM\Column(type="integer",name="used")
     */
    public $used=0;



    public function getId() {
    	return $this->id;
    }

    public function setMasse( $masse ) {

        $masse->programmations->add( $this );
        $this->masse = $masse;
    }

}