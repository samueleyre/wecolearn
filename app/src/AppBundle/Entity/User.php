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
   * @ORM\Column (type="boolean", name="tokenConfirmed")
   */
  public $tokenConfirmed = false;


  /**
   * @ORM\ManyToOne(targetEntity="App\Entity\Token", cascade={"persist", "merge"})
   * @ORM\JoinColumn(name="tokenId", referencedColumnName="id", nullable=true)
   */
  public $emailToken;

  

  public function getId() {
    	return $this->id;
  }


  /**
   * Set tokenConfirmed
   *
   * @param boolean $tokenConfirmed
   *
   * @return User
   */
  public function setTokenConfirmed($tokenConfirmed)
  {
      $this->tokenConfirmed = $tokenConfirmed;

      return $this;
  }

  /**
   * Get tokenConfirmed
   *
   * @return boolean
   */
  public function getTokenConfirmed()
  {
      return $this->tokenConfirmed;
  }


}



//    /**
//     * @ORM\OneToMany(targetEntity="Token", mappedBy="User", cascade={"persist", "merge"})
//     * @ORM\JoinColumn(name="tokenId", referencedColumnName="id")
//     */
//public $token;

//
///**
// * @ORM\Column (type="varchar(180)", name="confirmation_token", nullable=true)
// */
//public $confirmationToken = null;

