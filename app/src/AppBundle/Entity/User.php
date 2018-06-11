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
     * @ORM\OneToMany(targetEntity="Token", mappedBy="User", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="tokenId", referencedColumnName="id")
     */
    public $token;


    /**
     * @ORM\Column (type="boolean", name="tokenConfirmed")
     */
    public $tokenConfirmed = false;



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
        $this->token_confirmed = $tokenConfirmed;

        return $this;
    }

    /**
     * Get tokenConfirmed
     *
     * @return boolean
     */
    public function getTokenConfirmed()
    {
        return $this->token_confirmed;
    }
}
