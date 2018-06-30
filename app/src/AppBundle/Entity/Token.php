<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="token")
 */
class Token
{
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   */
  public $id;

  /**
   * @ORM\Column(type="string",name="token")
   */
  public $token;

  /**
   * @ORM\OneToOne(targetEntity="AppBundle\Entity\User",inversedBy="emailToken", cascade={"persist", "merge"})
   * @ORM\JoinColumn(name="userId", referencedColumnName="id", nullable=true, onDelete="NO ACTION")
   */
  public $user;

  /**
   * @var \DateTime
   *
   * @ORM\Column(name="created", type="datetime")
   */
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
     * @param \AppBundle\Entity\User $user
     *
     * @return Token
     */
    public function setUser(\AppBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \AppBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }
}
