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

    
    public function getId() {
    	return $this->id;
    }

    public function __construct() {
        $this->resultats = new ArrayCollection();
    }
}