<?php

namespace Bg\BgBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="masse")
 */
class Masse  {

	/**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     */
    public $name;

	/**
     * @ORM\OneToMany(targetEntity="Bg\BgBundle\Entity\Programmation", mappedBy="masse", cascade={"persist"})
     */
	public $programmations;

    /**
     * @ORM\Column(type="integer")
     */
    public $launched=0;



	public function getId() {
    	return $this->id;
    }

    public function __construct() {
    	$this->programmations = new ArrayCollection();
    }

}