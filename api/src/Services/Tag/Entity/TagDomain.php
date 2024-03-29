<?php

namespace App\Services\Tag\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Services\Tag\Repository\TagDomainRepository")
 */
class TagDomain
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private ?int $id;
    private string $name;
    private string $emoji;
    private string $hexcolor;
    private Collection $tags;

//    tag representing general domain
    private ?Tag $linkedTag;
    private \DateTimeInterface $created;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
    }

    public function create()
    {
        $this->created = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCreated(): \DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getEmoji(): ?string
    {
        return $this->emoji;
    }

    public function setEmoji(string $emoji): self
    {
        $this->emoji = $emoji;

        return $this;
    }

    public function getHexcolor(): ?string
    {
        return $this->hexcolor;
    }

    public function setHexcolor(string $hexcolor): self
    {
        $this->hexcolor = $hexcolor;

        return $this;
    }

    /**
     * @return Collection|Tag[]
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
            $tag->addTagDomain($this);
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        if ($this->tags->contains($tag)) {
            $this->tags->removeElement($tag);
            $tag->removeTagDomain($this);
        }

        return $this;
    }

    public function getLinkedTag(): Tag
    {
        return $this->linkedTag;
    }

    public function setLinkedTag(Tag $linkedTag): self
    {
        $this->linkedTag = $linkedTag;

        return $this;
    }
}
