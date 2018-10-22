<?php

namespace WcBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
 * @ORM\Entity(repositoryClass="WcBundle\Repository\ClientRepository")
 * @ORM\Table(name="client")
 */
class Client
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\OneToOne(targetEntity="WcBundle\Entity\User", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="userId", referencedColumnName="id", onDelete="NO ACTION")
     */
    public $user;

    /**
     * @ORM\Column(type="string", name="firstName", nullable=true)
     */
    public $firstName;

    /**
     * @ORM\Column(type="string", name="lastName", nullable=true)
     */
    public $lastName;

    /**
     * @ORM\Column(type="string", name="profilUrl")
     */
    public $profilUrl;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime")
     */
    private $created;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated", type="datetime", nullable=true)
     */
    private $updated;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="clientUpdated", type="datetime", nullable=true)
     */
    private $clientUpdated;

    /**
     * @ORM\Column(type="string", name="biographie", nullable=true, length=5000)
     */
    public $biographie;

    /**
     * @ORM\Column(type="integer", name="intensity", nullable=true)
     */
    public $intensity;

    /**
     * @ORM\Column(type="integer", name="atmosphere", nullable=true)
     */
    public $atmosphere;

    /**
     * @ORM\Column(type="float", name="latitude", nullable=true)
     */
    public $latitude;

    /**
     * @ORM\Column(type="float", name="longitude", nullable=true)
     */
    public $longitude;

    /**
     * @ORM\OneToOne(targetEntity="Image", inversedBy="client")
     * @ORM\JoinColumn(name="imageId", referencedColumnName="id")
     */
    public $image;

    /**
     * @ORM\ManyToMany(targetEntity="Tag", inversedBy="clients", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="tagsIds", referencedColumnName="id", nullable=true)
     */
    public $tags;

    
    /**
     * @ORM\OneToMany(targetEntity="Message", mappedBy="sender", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="sentMessageIds", referencedColumnName="id", nullable=true)
     * @MaxDepth(1)
     */
    public $sentMessages;

    /**
     * @ORM\OneToMany(targetEntity="Message", mappedBy="receiver", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="receivedMessageIds", referencedColumnName="id", nullable=true)
     */
    public $receivedMessages;


   /**
    * @ORM\Column(type="boolean", name="showProfil")
    */
    public $showProfil = false;


    /**
     * @ORM\Column(type="boolean", name="emailNotifications")
     */
    public $emailNotifications = true;

    /**
     * @ORM\OneToMany(targetEntity="WcBundle\Entity\SlackAccount",mappedBy="client", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="slackAccountIds", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     */
    public $slackAccounts;


  /**
     * @ORM\ManyToMany(targetEntity="Domain", inversedBy="clients", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="DomainIds", referencedColumnName="id", nullable=true)
     */
    public $domains;


    /**
     * Constructor
     */
    public function __construct()
    {
        $this->tags = new \Doctrine\Common\Collections\ArrayCollection();
        $this->created = new \DateTime("now", new \DateTimeZone('Europe/Paris'));
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
     * Set firstName
     *
     * @param string $firstName
     *
     * @return Client
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     *
     * @return Client
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set profilUrl
     *
     * @param string $profilUrl
     *
     * @return Client
     */
    public function setProfilUrl($profilUrl)
    {
        $this->profilUrl = $profilUrl;

        return $this;
    }

    /**
     * Get profilUrl
     *
     * @return string
     */
    public function getProfilUrl()
    {
        return $this->profilUrl;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Client
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
     * Set updated
     *
     * @param \DateTime $updated
     *
     * @return Client
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
     * Set clientUpdated
     *
     * @param \DateTime $clientUpdated
     *
     * @return Client
     */
    public function setClientUpdated($clientUpdated)
    {
        $this->clientUpdated = $clientUpdated;

        return $this;
    }

    /**
     * Get clientUpdated
     *
     * @return \DateTime
     */
    public function getClientUpdated()
    {
        return $this->clientUpdated;
    }

    /**
     * Set biographie
     *
     * @param string $biographie
     *
     * @return Client
     */
    public function setBiographie($biographie)
    {
        $this->biographie = $biographie;

        return $this;
    }

    /**
     * Get biographie
     *
     * @return string
     */
    public function getBiographie()
    {
        return $this->biographie;
    }

    /**
     * Set latitude
     *
     * @param float $latitude
     *
     * @return Client
     */
    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * Get latitude
     *
     * @return float
     */
    public function getLatitude()
    {
        return $this->latitude;
    }

    /**
     * Set longitude
     *
     * @param float $longitude
     *
     * @return Client
     */
    public function setLongitude($longitude)
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * Get longitude
     *
     * @return float
     */
    public function getLongitude()
    {
        return $this->longitude;
    }

    /**
     * Set intensity
     *
     * @param integer $intensity
     *
     * @return Client
     */
    public function setIntensity($intensity)
    {
        $this->intensity = $intensity;

        return $this;
    }

    /**
     * Get intensity
     *
     * @return integer
     */
    public function getIntensity()
    {
        return $this->intensity;
    }

    /**
     * Set showProfil
     *
     * @param boolean $showProfil
     *
     * @return Client
     */
    public function setShowProfil($showProfil)
    {
      $this->showProfil = $showProfil;

      return $this;
    }

    /**
     * Get showProfil
     *
     * @return boolean
     */
    public function getShowProfil()
    {
      return $this->showProfil;
    }


  /**
     * Set emailNotifications
     *
     * @param boolean $emailNotifications
     *
     * @return Client
     */
    public function setEmailNotifications($emailNotifications)
    {
      $this->emailNotifications = $emailNotifications;

      return $this;
    }

    /**
     * Get emailNotifications
     *
     * @return boolean
     */
    public function getEmailNotifications()
    {
      return $this->emailNotifications;
    }


    /**
     * Set atmosphere
     *
     * @param integer $atmosphere
     *
     * @return Client
     */
    public function setAtmosphere($atmosphere)
    {
        $this->atmosphere = $atmosphere;

        return $this;
    }

    /**
     * Get atmosphere
     *
     * @return integer
     */
    public function getAtmosphere()
    {
        return $this->atmosphere;
    }

    /**
     * Set user
     *
     * @param \WcBundle\Entity\User $user
     *
     * @return Client
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
     * Set image
     *
     * @param \WcBundle\Entity\Image $image
     *
     * @return Client
     */
    public function setImage(\WcBundle\Entity\Image $image = null)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return \WcBundle\Entity\Image
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Add tag
     *
     * @param \WcBundle\Entity\Tag $tag
     *
     * @return Client
     */
    public function addTag(\WcBundle\Entity\Tag $tag)
    {
        $this->tags[] = $tag;

        return $this;
    }

    /**
     * Remove tag
     *
     * @param \WcBundle\Entity\Tag $tag
     */
    public function removeTag(\WcBundle\Entity\Tag $tag)
    {
        $this->tags->removeElement($tag);
    }

    /**
     * Get tags
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * Set tags
     *
     * @param \Doctrine\Common\Collections\Collection
     */
    public function setTags($tags)
    {
        $this->tags = $tags;
    }


    /**
     * Add selected
     *
     * @param \WcBundle\Entity\Selection $selected
     *
     * @return Client
     */
    public function addSelected(\WcBundle\Entity\Selection $selected)
    {
        $this->selected[] = $selected;

        return $this;
    }

    /**
     * Remove selected
     *
     * @param \WcBundle\Entity\Selection $selected
     */
    public function removeSelected(\WcBundle\Entity\Selection $selected)
    {
        $this->selected->removeElement($selected);
    }

    /**
     * Get selected
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSelected()
    {
        return $this->selected;
    }


    /**
     * Add sentMessage
     *
     * @param \WcBundle\Entity\Message $sentMessage
     *
     * @return Client
     */
    public function addSentMessage(\WcBundle\Entity\Message $sentMessage)
    {
        $this->sentMessages[] = $sentMessage;

        return $this;
    }

    /**
     * Remove sentMessage
     *
     * @param \WcBundle\Entity\Message $sentMessage
     */
    public function removeSentMessage(\WcBundle\Entity\Message $sentMessage)
    {
        $this->sentMessages->removeElement($sentMessage);
    }

    /**
     * Add receivedMessage
     *
     * @param \WcBundle\Entity\Message $receivedMessage
     *
     * @return Client
     */
    public function addReceivedMessage(\WcBundle\Entity\Message $receivedMessage)
    {
        $this->receivedMessages[] = $receivedMessage;

        return $this;
    }

    /**
     * Remove receivedMessage
     *
     * @param \WcBundle\Entity\Message $receivedMessage
     */
    public function removeReceivedMessage(\WcBundle\Entity\Message $receivedMessage)
    {
        $this->receivedMessages->removeElement($receivedMessage);
    }

    /**
     * Get sentMessages
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSentMessages()
    {
        return $this->sentMessages;
    }

    /**
     * Get receivedMessages
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getReceivedMessages()
    {
        return $this->receivedMessages;
    }


    /**
     * Add domain
     *
     * @param \WcBundle\Entity\Domain $domain
     *
     * @return Client
     */
    public function addDomain(\WcBundle\Entity\Domain $domain)
    {
        $this->domains[] = $domain;

        return $this;
    }

    /**
     * Remove domain
     *
     * @param \WcBundle\Entity\Domain $domain
     */
    public function removeDomain(\WcBundle\Entity\Domain $domain)
    {
        $this->domains->removeElement($domain);
    }

    /**
     * Get domains
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getDomains()
    {
        return $this->domains;
    }

    /**
     * Add slackAccount
     *
     * @param \WcBundle\Entity\SlackAccount $slackAccount
     *
     * @return Client
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
}
