<?php
namespace Bg\BgBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="host")
 */
class Hebergeur {
    
    
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
     * @ORM\Column(type="string",name="ftpLogin")
     */
    public $ftpLogin;

    
    /**
     * @ORM\Column(type="string",name="ftpPassword")
     */
    public $ftpPassword;

    /**
     * @ORM\Column(type="string",name="accountLogin")
     */
    public $accountLogin;

   	
   	/**
     * @ORM\Column(type="string",name="accountPassword")
     */
    public $accountPassword;

    
    public function getId() {
    	return $this->id;
    }
}

