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
     * @ORM\Column(type="integer",name="idPhraseClef", nullable=true)
     */
    public $idPhraseClef;

	/**
     * @ORM\Column(type="integer",name="isBlank")
     */
    public $isBlank;

	/**
     * @ORM\Column(type="integer",name="isException", nullable=true)
     */
    public $isException;

	/**
     * @ORM\Column(type="integer",name="isPage")
     */
    public $isPage;

     /**
     * @ORM\ManyToOne(targetEntity="Bg\BgBundle\Entity\Masse", inversedBy="programmations")
     * @ORM\JoinColumn(name="idMasse", referencedColumnName="id",onDelete="CASCADE")
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

    /**
     * @ORM\Column(type="integer",name="blogPageId", nullable=true)
     */
    public $blogPageId=null;


    public function __construct() {
        $this->time = new \Datetime();
    }

    public function getId() {
    	return $this->id;
    }

    public function setMasse( $masse ) {

        $masse->programmations->add( $this );
        $this->masse = $masse;
    }

    /**
     * Set anchorPosition
     *
     * @param integer $anchorPosition
     *
     * @return Programmation
     */
    public function setAnchorPosition($anchorPosition)
    {
        $this->anchorPosition = $anchorPosition;

        return $this;
    }

    /**
     * Get anchorPosition
     *
     * @return integer
     */
    public function getAnchorPosition()
    {
        return $this->anchorPosition;
    }

    /**
     * Set anchorSentenceNumber
     *
     * @param integer $anchorSentenceNumber
     *
     * @return Programmation
     */
    public function setAnchorSentenceNumber($anchorSentenceNumber)
    {
        $this->anchorSentenceNumber = $anchorSentenceNumber;

        return $this;
    }

    /**
     * Get anchorSentenceNumber
     *
     * @return integer
     */
    public function getAnchorSentenceNumber()
    {
        return $this->anchorSentenceNumber;
    }

    /**
     * Set idClient
     *
     * @param integer $idClient
     *
     * @return Programmation
     */
    public function setIdClient($idClient)
    {
        $this->idClient = $idClient;

        return $this;
    }

    /**
     * Get idClient
     *
     * @return integer
     */
    public function getIdClient()
    {
        return $this->idClient;
    }

    /**
     * Set idBlog
     *
     * @param integer $idBlog
     *
     * @return Programmation
     */
    public function setIdBlog($idBlog)
    {
        $this->idBlog = $idBlog;

        return $this;
    }

    /**
     * Get idBlog
     *
     * @return integer
     */
    public function getIdBlog()
    {
        return $this->idBlog;
    }

    /**
     * Set idLanguageAnchor
     *
     * @param integer $idLanguageAnchor
     *
     * @return Programmation
     */
    public function setIdLanguageAnchor($idLanguageAnchor)
    {
        $this->idLanguageAnchor = $idLanguageAnchor;

        return $this;
    }

    /**
     * Get idLanguageAnchor
     *
     * @return integer
     */
    public function getIdLanguageAnchor()
    {
        return $this->idLanguageAnchor;
    }

    /**
     * Set idLanguageNeutral
     *
     * @param integer $idLanguageNeutral
     *
     * @return Programmation
     */
    public function setIdLanguageNeutral($idLanguageNeutral)
    {
        $this->idLanguageNeutral = $idLanguageNeutral;

        return $this;
    }

    /**
     * Get idLanguageNeutral
     *
     * @return integer
     */
    public function getIdLanguageNeutral()
    {
        return $this->idLanguageNeutral;
    }

    /**
     * Set idLanguageTitle
     *
     * @param integer $idLanguageTitle
     *
     * @return Programmation
     */
    public function setIdLanguageTitle($idLanguageTitle)
    {
        $this->idLanguageTitle = $idLanguageTitle;

        return $this;
    }

    /**
     * Get idLanguageTitle
     *
     * @return integer
     */
    public function getIdLanguageTitle()
    {
        return $this->idLanguageTitle;
    }

    /**
     * Set idPhraseClef
     *
     * @param integer $idPhraseClef
     *
     * @return Programmation
     */
    public function setIdPhraseClef($idPhraseClef)
    {
        $this->idPhraseClef = $idPhraseClef;

        return $this;
    }

    /**
     * Get idPhraseClef
     *
     * @return integer
     */
    public function getIdPhraseClef()
    {
        return $this->idPhraseClef;
    }

    /**
     * Set isBlank
     *
     * @param integer $isBlank
     *
     * @return Programmation
     */
    public function setIsBlank($isBlank)
    {
        $this->isBlank = $isBlank;

        return $this;
    }

    /**
     * Get isBlank
     *
     * @return integer
     */
    public function getIsBlank()
    {
        return $this->isBlank;
    }

    /**
     * Set isException
     *
     * @param integer $isException
     *
     * @return Programmation
     */
    public function setIsException($isException)
    {
        $this->isException = $isException;

        return $this;
    }

    /**
     * Get isException
     *
     * @return integer
     */
    public function getIsException()
    {
        return $this->isException;
    }

    /**
     * Set isPage
     *
     * @param integer $isPage
     *
     * @return Programmation
     */
    public function setIsPage($isPage)
    {
        $this->isPage = $isPage;

        return $this;
    }

    /**
     * Get isPage
     *
     * @return integer
     */
    public function getIsPage()
    {
        return $this->isPage;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Programmation
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set neutralSentenceNumber
     *
     * @param integer $neutralSentenceNumber
     *
     * @return Programmation
     */
    public function setNeutralSentenceNumber($neutralSentenceNumber)
    {
        $this->neutralSentenceNumber = $neutralSentenceNumber;

        return $this;
    }

    /**
     * Get neutralSentenceNumber
     *
     * @return integer
     */
    public function getNeutralSentenceNumber()
    {
        return $this->neutralSentenceNumber;
    }

    /**
     * Set pause
     *
     * @param integer $pause
     *
     * @return Programmation
     */
    public function setPause($pause)
    {
        $this->pause = 60 * $pause;

        return $this;
    }

    /**
     * Get pause
     *
     * @return integer
     */
    public function getPause()
    {
        return $this->pause;
    }

    /**
     * Set time
     *
     * @param \DateTime $time
     *
     * @return Programmation
     */
    public function setTime($time)
    {
        $this->time = $time;
        return $this;
    }

    /**
     * Get time
     *
     * @return \DateTime
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * Set titleOption
     *
     * @param integer $titleOption
     *
     * @return Programmation
     */
    public function setTitleOption($titleOption)
    {
        $this->titleOption = $titleOption;

        return $this;
    }

    /**
     * Get titleOption
     *
     * @return integer
     */
    public function getTitleOption()
    {
        return $this->titleOption;
    }

    /**
     * Set used
     *
     * @param integer $used
     *
     * @return Programmation
     */
    public function setUsed($used)
    {
        $this->used = $used;

        return $this;
    }

    /**
     * Get used
     *
     * @return integer
     */
    public function getUsed()
    {
        return $this->used;
    }

    /**
     * Get masse
     *
     * @return \Bg\BgBundle\Entity\Masse
     */
    public function getMasse()
    {
        return $this->masse;
    }
}
