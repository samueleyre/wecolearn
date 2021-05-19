<?php

namespace App\Services\Domain\Entity;

use App\Services\Shared\Entity\Image;
use App\Services\Shared\Entity\Token;
use App\Services\User\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

class Domain
{
    public ?int $id = null;
    public string $name;
    public $users;
    public ?int $count = null;
    public ?Image $image = null;
    public ?bool $isMain = null;
    public ?Token $inviteToken = null;
    public $communityAdmins;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->communityAdmins = new ArrayCollection();
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

    public function countUsers()
    {
        $this->count = count($this->users);
    }


    public function getCount()
    {
        return $this->count;
    }

    /**
     * Set image.
     *
     * @param Image|null $image
     *
     * @return Domain
     */
    public function setImage(Image $image = null): Domain
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image.
     *
     * @return Image|null
     */
    public function getImage(): ?Image
    {
        return $this->image;
    }

    /**
     * Set isMain.
     *
     * @param bool $isMain
     * @return Domain
     */
    public function setIsMain(bool $isMain): Domain
    {
        $this->isMain = $isMain;
        return $this;
    }


    /**
     * Get isMain.
     *
     * @return ?bool
     */
    public function getIsMain(): ?bool
    {
        return $this->isMain;
    }

    /**
     * Set inviteToken.
     *
     * @param Token $inviteToken
     * @return Domain
     */
    public function setInviteToken(Token $inviteToken): Domain
    {
        $this->inviteToken = $inviteToken;
        return $this;
    }


    /**
     * Get inviteToken.
     *
     * @return ?Token
     */
    public function getInviteToken(): ?Token
    {
        return $this->inviteToken;
    }

    /**
     * @return Collection|User[]
     */
    public function getCommunityAdmins(): Collection
    {
        return $this->communityAdmins;
    }

    public function setCommunityAdmins(Collection $communityAdmins): self
    {
        $this->communityAdmins = $communityAdmins;
        return $this;
    }

    public function addCommunityAdmin(User $communityAdmin): self
    {
        if (!$this->communityAdmins->contains($communityAdmin)) {
            $this->communityAdmins[] = $communityAdmin;
            $communityAdmin->setAdminDomain($this);
        }

        return $this;
    }

    public function removeCommunityAdmin(User $communityAdmin): self
    {
        if ($this->communityAdmins->removeElement($communityAdmin)) {
            // set the owning side to null (unless already changed)
            if ($communityAdmin->getAdminDomain() === $this) {
                $communityAdmin->setAdminDomain(null);
            }
        }

        return $this;
    }


}
