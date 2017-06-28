<?php
namespace Bg\BgBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="resultat")
 */
class Resultat
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="datetime",name="date")
     */
    public $date;

    /**
     * @ORM\Column(type="integer",name="rank", nullable=true)
     */
    public $rank;

    /**
     * @ORM\Column(type="integer",name="page", nullable=true)
     */
    public $page;
    
    /**
     * @ORM\ManyToOne(targetEntity="Bg\BgBundle\Entity\Recherche",inversedBy="resultats")
     * @ORM\JoinColumn(name="idRecherche", referencedColumnName="id", onDelete="CASCADE")
     */
    public $recherche;

    
    public function getId() {
    	return $this->id;
    }

    public function setRecherche( Recherche $recherche ) {
        
        $recherche->resultats->add( $this );
        $this->recherche = $recherche;
    
    }
}