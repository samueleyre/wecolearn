<?php
namespace Bg\BgBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="client")
 */
class Client
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
    protected $name;

    public function getId() {
    	return $this->id;
    }

    public function setName( $name ) {
    	$this->name = $name;
    	return $this;
    }

    public function getName() {
    	return $this->name;
    }
}