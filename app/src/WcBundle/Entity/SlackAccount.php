<?php

namespace WcBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\UniqueConstraint;


/**
 * @ORM\Entity
 * @ORM\Table(name="slackAccount",
 *    uniqueConstraints={
 *        @UniqueConstraint(name="uniqueSlackAccount",
 *            columns={"accountId", "slackTeamId"})
 *    })
 *
 */
class SlackAccount
{
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   */
  public $id;


  /**
   * @ORM\Column(type="string",name="accountId")
   */
  public $accountId;

  /**
   * @ORM\ManyToOne(targetEntity="WcBundle\Entity\SlackTeam",inversedBy="slackAccounts", cascade={"persist", "merge"})
   * @ORM\JoinColumn(name="slackTeamId", referencedColumnName="id", nullable=true, onDelete="SET NULL")
   */
  public $slackTeam;


  /**
   * @ORM\ManyToOne(targetEntity="WcBundle\Entity\User",inversedBy="slackAccounts", cascade={"persist", "merge"})
   * @ORM\JoinColumn(name="userId", referencedColumnName="id", nullable=true, onDelete="SET NULL")
   */
   public $user;




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
     * Set slackTeam
     *
     * @param \WcBundle\Entity\SlackTeam $slackTeam
     *
     * @return SlackAccount
     */
    public function setSlackTeam(\WcBundle\Entity\SlackTeam $slackTeam = null)
    {
        $this->slackTeam = $slackTeam;

        return $this;
    }

    /**
     * Get slackTeam
     *
     * @return \WcBundle\Entity\SlackTeam
     */
    public function getSlackTeam()
    {
        return $this->slackTeam;
    }

    /**
     * Set user
     *
     * @param \WcBundle\Entity\User $user
     *
     * @return SlackAccount
     */
    public function setUser(\WcBundle\Entity\User $user = null)
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

    /**
     * Set accountId
     *
     * @param string $accountId
     *
     * @return SlackAccount
     */
    public function setAccountId($accountId)
    {
        $this->accountId = $accountId;

        return $this;
    }

    /**
     * Get accountId
     *
     * @return string
     */
    public function getAccountId()
    {
        return $this->accountId;
    }
}
