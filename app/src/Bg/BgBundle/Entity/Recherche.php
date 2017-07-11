<?php
namespace Bg\BgBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="recherche")
 */
class Recherche
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string",name="name")
     */
    public $name;

    /**
     * @ORM\Column(type="string",name="recherche")
     */
    public $recherche;

    /**
     * @ORM\Column(type="string",name="url")
     */
    public $url;

    /**
     * @ORM\OneToMany(targetEntity="Bg\BgBundle\Entity\Resultat", mappedBy="recherche", cascade={"persist"})
     */
    public $resultats;

    /**
     * @ORM\Column(type="integer",name="nextTime")
     */
    public $nextTime;

    
    public function getId() {
    	return $this->id;
    }

    public function __construct() {
        $this->resultats = new ArrayCollection();
        $this->nextime = time() + rand(60,300);
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Recherche
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
     * Set recherche
     *
     * @param string $recherche
     *
     * @return Recherche
     */
    public function setRecherche($recherche)
    {
        $this->recherche = $recherche;

        return $this;
    }

    /**
     * Get recherche
     *
     * @return string
     */
    public function getRecherche()
    {
        return $this->recherche;
    }

    /**
     * Set url
     *
     * @param string $url
     *
     * @return Recherche
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set nextTime
     *
     * @param integer $nextTime
     *
     * @return Recherche
     */
    public function setNextTime($nextTime)
    {
        $this->nextTime = $nextTime;

        return $this;
    }

    /**
     * Get nextTime
     *
     * @return integer
     */
    public function getNextTime()
    {
        return $this->nextTime;
    }

    /**
     * Add resultat
     *
     * @param \Bg\BgBundle\Entity\Resultat $resultat
     *
     * @return Recherche
     */
    public function addResultat(\Bg\BgBundle\Entity\Resultat $resultat)
    {
        $this->resultats[] = $resultat;

        return $this;
    }

    /**
     * Remove resultat
     *
     * @param \Bg\BgBundle\Entity\Resultat $resultat
     */
    public function removeResultat(\Bg\BgBundle\Entity\Resultat $resultat)
    {
        $this->resultats->removeElement($resultat);
    }

    /**
     * Get resultats
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getResultats()
    {
        return $this->resultats;
    }
}
