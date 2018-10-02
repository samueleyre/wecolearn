<?php

namespace WcBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
 * @ORM\Entity
 * @ORM\Table(name="Email")
 */
class Email
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\User", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="userId", referencedColumnName="id", onDelete="NO ACTION")
     */
    public $user;

    /**
     * @ORM\Column(type="string", name="email", nullable=true)
     */
    public $email;

    /**
     * @ORM\Column(type="boolean", name="confirmed")
     */
    public $confirmed = 0;

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
   * Set email
   *
   * @param string $email
   *
   * @return Email
   */
  public function setEmail($email)
  {
      $this->email = $email;

      return $this;
  }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }


    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Client
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
     * Set confirmed
     *
     * @param boolean $confirmed
     *
     * @return Email
     */
    public function setConfirmed($confirmed)
    {
        $this->confirmed = $confirmed;

        return $this;
    }

    /**
     * Get confirmed
     *
     * @return boolean
     */
    public function getConfirmed()
    {
        return $this->confirmed;
    }

    /**
     * Set user
     *
     * @param \AppBundle\Entity\User $user
     *
     * @return Email
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
