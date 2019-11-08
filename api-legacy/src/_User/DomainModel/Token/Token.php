<?php

namespace App\_User\DomainModel\Token;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="token")
 */
class Token
{

  public $id;

  public $token;

  public $user;

  public $type;

  private $created;

  /**
   * Constructor
   */
  public function __construct()
  {
    $this->created = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
  }



  /**
   * Get id
   *
   * @return integer
   */
  public function getId()
  {
      return $this->id;
  }

  /**
   * Set token
   *
   * @param string $token
   *
   * @return Token
   */
  public function setToken($token)
  {
      $this->token = $token;

      return $this;
  }

  /**
   * Get token
   *
   * @return string
   */
  public function getToken()
  {
      return $this->token;
  }

  /**
   * Set type
   *
   * @param integer $type
   *
   * @return Token
   */
  public function setType($type)
  {
    $this->type = $type;

    return $this;
  }

  /**
   * Get type
   *
   * @return integer
   */
  public function getType()
  {
    return $this->type;
  }


  /**
   * Set created
   *
   * @param \DateTime $created
   *
   * @return Token
   */
  public function setCreated($created)
  {
    $this->created = $created;

    return $this;
  }

  /**
   * Get created
   *
   * @return \DateTime
   */
  public function getCreated()
  {
    return $this->created;
  }




    /**
     * Set user
     *
     * @param \WcBundle\Entity\User $user
     *
     * @return Token
     */
    public function setUser(\App\_User\DomainModel\User\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \WcBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }
}
