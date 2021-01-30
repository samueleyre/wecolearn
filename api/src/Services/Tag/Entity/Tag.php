<?php

namespace App\Services\Tag\Entity;

use App\Services\User\Entity\User;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

class Tag
{
    public ?int $id;
    public string $name;
    public int $type;
    public ?int $iteration;
    public DateTime $created;
    private Collection $users;
    private Collection $tagDomains;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->tagDomains = new ArrayCollection();
        $this->iteration = 0;
        $this->created = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
    }

    /**
     * Get id.
     *
     * @return int
     */
    public function getId(): int
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
    public function setId($id): Tag
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
    public function setName(string $name): Tag
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName(): string
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
    public function setType(int $type): Tag
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type.
     *
     * @return int
     */
    public function getType(): int
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
    public function setIteration(int $iteration): Tag
    {
        $this->iteration = $iteration;

        return $this;
    }

    /**
     * Get iteration.
     *
     * @return int
     */
    public function getIteration(): int
    {
        return $this->iteration;
    }

    /**
     * Set created.
     *
     * @param DateTime $created
     *
     * @return Tag
     */
    public function setCreated(DateTime $created): Tag
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created.
     *
     * @return DateTime
     */
    public function getCreated(): DateTime
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
    public function addUser(User $user): Tag
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
     * @return Collection|User[]
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * @return Collection|TagDomain[]
     */
    public function getTagDomains()
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
