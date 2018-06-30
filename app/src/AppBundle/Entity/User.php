<?php
namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   */
  protected $id;

  /**
   * @ORM\Column (type="boolean", name="emailConfirmed")
   */
  public $emailConfirmed = false;


  /**
   * @ORM\OneToOne(targetEntity="AppBundle\Entity\Token",mappedBy="user", cascade={"persist", "merge"})
//   * @ORM\JoinColumn(name="emailTokenId", referencedColumnName="id", nullable=true, onDelete="NO ACTION")
   */
  public $emailToken;



  public function getId() {
    	return $this->id;
  }


  /**
   * Set emailConfirmed
   *
   * @param boolean $emailConfirmed
   *
   * @return User
   */
  public function setEmailConfirmed($emailConfirmed)
  {
      $this->emailConfirmed = $emailConfirmed;

      return $this;
  }

  /**
   * Get emailConfirmed
   *
   * @return boolean
   */
  public function getEmailConfirmed()
  {
      return $this->emailConfirmed;
  }



    /**
     * Set emailToken
     *
     * @param \AppBundle\Entity\Token $emailToken
     *
     * @return User
     */
    public function setEmailToken(\AppBundle\Entity\Token $emailToken = null)
    {
        $this->emailToken = $emailToken;

        return $this;
    }

    /**
     * Get emailToken
     *
     * @return \AppBundle\Entity\Token
     */
    public function getEmailToken()
    {
        return $this->emailToken;
    }
}
