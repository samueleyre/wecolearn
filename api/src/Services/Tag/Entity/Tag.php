<?php

namespace App\Services\Tag\Entity;

use App\Services\User\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

class Tag
{
    public $id;
    public $name;
    public $type;
    public $iteration;
    public $created;
    private $users;
    private $tagDomains;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->tagDomains = new ArrayCollection();
    }

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set id.
     *
     * @param int
     *
     * @return Tag
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Set name.
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
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set type.
     *
     * @param int $type
     *
     * @return Tag
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type.
     *
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set iteration.
     *
     * @param int $iteration
     *
     * @return Tag
     */
    public function setIteration($iteration)
    {
        $this->iteration = $iteration;

        return $this;
    }

    /**
     * Get iteration.
     *
     * @return int
     */
    public function getIteration()
    {
        return $this->iteration;
    }

    /**
     * Set created.
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
     * Get created.
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Add user.
     *
     * @param User $user
     *
     * @return Tag
     */
    public function addUser(User $user)
    {
        $this->users[] = $user;

        return $this;
    }

    /**
     * Remove user.
     *
     * @param User $user
     */
    public function removeUser(User $user)
    {
        $this->users->removeElement($user);
    }

    /**
     * Get users.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * @return Collection|TagDomain[]
     */
    public function getTagDomains(): Collection
    {
        return $this->tagDomains;
    }

    public function addTagDomain(TagDomain $tagDomain): self
    {
        if (!$this->tagDomains->contains($tagDomain)) {
            $this->tagDomains[] = $tagDomain;
        }

        return $this;
    }

    public function removeTagDomain(TagDomain $tagDomain): self
    {
        if ($this->tagDomains->contains($tagDomain)) {
            $this->tagDomains->removeElement($tagDomain);
        }

        return $this;
    }
    
}
