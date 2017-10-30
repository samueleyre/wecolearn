<?php

namespace WcBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="WcBundle\Repository\TagRepository")
 * @ORM\Table(name="tag")
 *
 */
class Tag
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\Column(type="string",name="name")
     */
    public $name;

    /**
     * @ORM\Column(type="string",name="type")
     */
    public $type;

    /**
     * @ORM\Column(type="integer",name="iteration")
     */
    public $iteration;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime")
     */
    public $created;


    /**
     * @ORM\ManyToMany(targetEntity="Client", mappedBy="tags")
     */
    private $clients;



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
     * Set id
     *
     * @param integer
     *
     * @return Tag
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Tag
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
     * Set type
     *
     * @param string $type
     *
     * @return Tag
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


    /**
     * Set iteration
     *
     * @param integer $iteration
     *
     * @return Tag
     */
    public function setIteration($iteration)
    {
        $this->iteration = $iteration;

        return $this;
    }

    /**
     * Get iteration
     *
     * @return integer
     */
    public function getIteration()
    {
        return $this->iteration;
    }


    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Tag
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
     * Add client
     *
     * @param \WcBundle\Entity\Client $client
     *
     * @return Tag
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
}
