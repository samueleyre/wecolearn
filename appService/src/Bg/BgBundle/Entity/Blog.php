<?php
namespace Bg\BgBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="blog")
 */
class Blog
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

    /**
     * @ORM\Column(type="string",name="url")
     */
    protected $url;

    /**
     * @ORM\Column(type="string",name="login")
     */
    protected $login;

    
    /**
     * @ORM\Column(type="string",name="pass")
     */
    protected $pass;

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

    public function setUrl( $url ) {
    	$this->url = $url;
    	return $this;
    }

    public function getUrl () {
    	return $this->url;
    }

    public function setLogin( $login ) {
    	$this->login = $login;
    	return $this;
    }

    public function getLogin() {
    	return $this->login;
    }

    public function setPass( $pass ) {
    	$this->pass = $pass;
    	return $this;
    }

    public function getPass() {
    	return $this->pass;
    }

}