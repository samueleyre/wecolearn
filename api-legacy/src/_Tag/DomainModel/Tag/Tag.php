<?php

namespace App\_Tag\DomainModel\Tag;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\WcBundle\Repository\TagRepository")
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
     * @ORM\Column(type="integer",name="type")
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
     * @ORM\ManyToMany(targetEntity="App\_User\DomainModel\User\User", mappedBy="tags")
     */
    private $users;



    /**
     * Constructor
     */
    public function __construct()
    {
        $this->users = new \Doctrine\Common\Collections\ArrayCollection();
//        $this->iteration = 0;
//        $this->created = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
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
     * @param integer $type
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
     * @return integer
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
     * Add user
     *
     * @param \WcBundle\Entity\User $user
     *
     * @return Tag
     */
    public function addUser(\App\_User\DomainModel\User\User $user)
    {
        $this->users[] = $user;

        return $this;
    }

    /**
     * Remove user
     *
     * @param \WcBundle\Entity\User $user
     */
    public function removeUser(\App\_User\DomainModel\User\User $user)
    {
        $this->users->removeElement($user);
    }

    /**
     * Get users
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUsers()
    {
        return $this->users;
    }
}
