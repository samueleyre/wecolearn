<?php

namespace WcBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\UniqueConstraint;


/**
 * @ORM\Entity
 * @ORM\Table(name="slackTeam",
 *   uniqueConstraints={
 *        @UniqueConstraint(name="uniqueSlackAccount",
 *            columns={"teamId", "type"})
 *    })
 *
 */
class SlackTeam
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\Column(type="string",name="name", nullable=true,)
     */
    public $name = null;


    /**
     * @ORM\Column(type="string",name="teamId")
     */
    public $teamId;


    /**
     * @ORM\OneToMany(targetEntity="WcBundle\Entity\SlackAccount",mappedBy="slackTeam", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="slackAccountIds", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     */
    public $slackAccounts;


    /**
     * @ORM\Column(type="string",name="type")
     */
    public $type;


    /**
     * Constructor
     */
    public function __construct()
    {
        $this->slackAccounts = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set name
     *
     * @param string $name
     *
     * @return SlackTeam
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set teamId
     *
     * @param string $teamId
     *
     * @return SlackTeam
     */
    public function setTeamId($teamId)
    {
        $this->teamId = $teamId;

        return $this;
    }

    /**
     * Get teamId
     *
     * @return string
     */
    public function getTeamId()
    {
        return $this->teamId;
    }

    /**
     * Add slackAccount
     *
     * @param \WcBundle\Entity\SlackAccount $slackAccount
     *
     * @return SlackTeam
     */
    public function addSlackAccount(\WcBundle\Entity\SlackAccount $slackAccount)
    {
        $this->slackAccounts[] = $slackAccount;

        return $this;
    }

    /**
     * Remove slackAccount
     *
     * @param \WcBundle\Entity\SlackAccount $slackAccount
     */
    public function removeSlackAccount(\WcBundle\Entity\SlackAccount $slackAccount)
    {
        $this->slackAccounts->removeElement($slackAccount);
    }

    /**
     * Get slackAccounts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSlackAccounts()
    {
        return $this->slackAccounts;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return SlackTeam
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }
}
