<?php
namespace WcBundle\Entity;

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
   * @ORM\OneToMany(targetEntity="WcBundle\Entity\Token",mappedBy="user", cascade={"persist", "merge"})
   * @ORM\JoinColumn(name="emailTokenId", referencedColumnName="id", nullable=true, onDelete="SET NULL")
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
     * Add emailToken
     *
     * @param \WcBundle\Entity\Token $emailToken
     *
     * @return User
     */
    public function addEmailToken(\WcBundle\Entity\Token $emailToken)
    {
        $this->emailToken[] = $emailToken;

        return $this;
    }

    /**
     * Remove emailToken
     *
     * @param \WcBundle\Entity\Token $emailToken
     */
    public function removeEmailToken(\WcBundle\Entity\Token $emailToken)
    {
        $this->emailToken->removeElement($emailToken);
    }

    /**
     * Get emailToken
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEmailToken()
    {
        return $this->emailToken;
    }
}
