<?php

namespace WcBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="selection")
 */
class Selection
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToMany(targetEntity="Client", mappedBy="selected")
     * @ORM\JoinColumn(name="clientIds", referencedColumnName="id")
     */
    public $clients;

    /**
     * @ORM\OneToOne(targetEntity="Client", mappedBy="selection")
     * @ORM\JoinColumn(name="clientId", referencedColumnName="id")
     */
    public $client;


    /**
     * @ORM\Column(type="boolean",name="selected")
     */
    public $selected = false; // false means banned from view, true means saved for later


    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated", type="datetime", nullable=true)
     */
    private $updated;



    
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->clients = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set selected
     *
     * @param string $selected
     *
     * @return Selection
     */
    public function setSelected($selected)
    {
        $this->selected = $selected;

        return $this;
    }

    /**
     * Get selected
     *
     * @return string
     */
    public function getSelected()
    {
        return $this->selected;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     *
     * @return Selection
     */
    public function setUpdated($updated)
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * Get updated
     *
     * @return \DateTime
     */
    public function getUpdated()
    {
        return $this->updated;
    }

    /**
     * Add client
     *
     * @param \WcBundle\Entity\Client $client
     *
     * @return Selection
     */
    public function addClient(\WcBundle\Entity\Client $client)
    {
        $this->clients[] = $client;

        return $this;
    }

    /**
     * Remove client
     *
     * @param \WcBundle\Entity\Client $client
     */
    public function removeClient(\WcBundle\Entity\Client $client)
    {
        $this->clients->removeElement($client);
    }

    /**
     * Get clients
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getClients()
    {
        return $this->clients;
    }

    /**
     * Set client
     *
     * @param \WcBundle\Entity\Client $client
     *
     * @return Selection
     */
    public function setClient(\WcBundle\Entity\Client $client = null)
    {
        $this->client = $client;

        return $this;
    }

    /**
     * Get client
     *
     * @return \WcBundle\Entity\Client
     */
    public function getClient()
    {
        return $this->client;
    }
}
