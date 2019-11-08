<?php

namespace App\Services\Domain\Entity;

use App\Services\User\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

class Domain
{
    public $id;
    public $name;
    public $users;

    /**
     * Constructor.
     */
    public function __construct(string $name = null)
    {
        if ($name) {
            $this->name = $name;
        }
        $this->users = new ArrayCollection();
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
     * Set name.
     *
     * @param string $name
     *
     * @return Domain
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
     * Add user.
     *
     * @param User $user
     *
     * @return Domain
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
     * @return Collection
     */
    public function getUsers()
    {
        return $this->users;
    }
}
