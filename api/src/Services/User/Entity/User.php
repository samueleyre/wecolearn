<?php

namespace App\Services\User\Entity;

use App\Services\Chat\Entity\Message;
use App\Services\Domain\Entity\Domain;
use App\Services\Tag\Entity\Tag;
use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Model\User as BaseUser;

class User extends BaseUser
{
    protected $id;
    public $firstName;
    public $lastName;
    public $emailConfirmed;
    public $emailToken;
    public $profilUrl;
    private $created;
    private $updated;
    // for client header notifications
    private $userUpdated;
    // for client web and email notifications
    private $userNotified;
    public $biographie;
    public $intensity;
    public $atmosphere;
    public $latitude;
    public $longitude;
    public $image;
    public $tags;
    public $sentMessages;
    public $receivedMessages;

    //  USER CONFIG ----------------------------------
    public $showProfil;
    public $emailNotifications;
    //  public $slackAccounts;
    public $domains;
    private $lastConnexion;
    private $deleted;
    //  private $notificationSubscribe = false;
    //  private $subscriptions;

    public function __construct()
    {
        parent::__construct();
        $this->tags = new ArrayCollection();
        $this->created = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
    }

    public function getId()
    {
        return $this->id;
    }

    /**
     * Set emailConfirmed.
     *
     * @param bool $emailConfirmed
     *
     * @return User
     */
    public function setEmailConfirmed($emailConfirmed)
    {
        $this->emailConfirmed = $emailConfirmed;

        return $this;
    }

    /**
     * Get emailConfirmed.
     *
     * @return bool
     */
    public function getEmailConfirmed()
    {
        return $this->emailConfirmed;
    }

    /**
     * Add emailToken.
     *
     * @param Token $emailToken
     *
     * @return User
     */
    public function addEmailToken(Token $emailToken)
    {
        $this->emailToken[] = $emailToken;

        return $this;
    }

    /**
     * Remove emailToken.
     *
     * @param Token $emailToken
     */
    public function removeEmailToken(Token $emailToken)
    {
        $this->emailToken->removeElement($emailToken);
    }

    /**
     * Get emailToken.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEmailToken()
    {
        return $this->emailToken;
    }

    /**
     * Set firstName.
     *
     * @param string $firstName
     *
     * @return User
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName.
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName.
     *
     * @param string $lastName
     *
     * @return User
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName.
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set profilUrl.
     *
     * @param string $profilUrl
     *
     * @return User
     */
    public function setProfilUrl($profilUrl)
    {
        $this->profilUrl = $profilUrl;

        return $this;
    }

    /**
     * Get profilUrl.
     *
     * @return string
     */
    public function getProfilUrl()
    {
        return $this->profilUrl;
    }

    /**
     * Set created.
     *
     * @param \DateTime $created
     *
     * @return User
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
     * Set updated.
     *
     * @param \DateTime $updated
     *
     * @return User
     */
    public function setUpdated($updated)
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * Get updated.
     *
     * @return \DateTime
     */
    public function getUpdated()
    {
        return $this->updated;
    }

    /**
     * Set userUpdated.
     *
     * @param \DateTime $userUpdated
     *
     * @return User
     */
    public function setUserUpdated($userUpdated)
    {
        $this->userUpdated = $userUpdated;

        return $this;
    }

    /**
     * Get userUpdated.
     *
     * @return \DateTime
     */
    public function getUserUpdated()
    {
        return $this->userUpdated;
    }

    /**
     * Set biographie.
     *
     * @param string $biographie
     *
     * @return User
     */
    public function setBiographie($biographie)
    {
        $this->biographie = $biographie;

        return $this;
    }

    /**
     * Get biographie.
     *
     * @return string
     */
    public function getBiographie()
    {
        return $this->biographie;
    }

    /**
     * Set latitude.
     *
     * @param float $latitude
     *
     * @return User
     */
    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * Get latitude.
     *
     * @return float
     */
    public function getLatitude()
    {
        return $this->latitude;
    }

    /**
     * Set longitude.
     *
     * @param float $longitude
     *
     * @return User
     */
    public function setLongitude($longitude)
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * Get longitude.
     *
     * @return float
     */
    public function getLongitude()
    {
        return $this->longitude;
    }

    /**
     * Set intensity.
     *
     * @param int $intensity
     *
     * @return User
     */
    public function setIntensity($intensity)
    {
        $this->intensity = $intensity;

        return $this;
    }

    /**
     * Get intensity.
     *
     * @return int
     */
    public function getIntensity()
    {
        return $this->intensity;
    }

    /**
     * Set showProfil.
     *
     * @param bool $showProfil
     *
     * @return User
     */
    public function setShowProfil($showProfil)
    {
        $this->showProfil = $showProfil;

        return $this;
    }

    /**
     * Get showProfil.
     *
     * @return bool
     */
    public function getShowProfil()
    {
        return $this->showProfil;
    }

    /**
     * Set emailNotifications.
     *
     * @param bool $emailNotifications
     *
     * @return User
     */
    public function setEmailNotifications($emailNotifications)
    {
        $this->emailNotifications = $emailNotifications;

        return $this;
    }

    /**
     * Get emailNotifications.
     *
     * @return bool
     */
    public function getEmailNotifications()
    {
        return $this->emailNotifications;
    }

    /**
     * Set image.
     *
     * @param Image $image
     *
     * @return User
     */
    public function setImage(Image $image = null)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image.
     *
     * @return Image
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Add tag.
     *
     * @param Tag $tag
     *
     * @return User
     */
    public function addTag(Tag $tag)
    {
        $this->tags[] = $tag;

        return $this;
    }

    /**
     * Remove tag.
     *
     * @param Tag $tag
     */
    public function removeTag(Tag $tag)
    {
        $this->tags->removeElement($tag);
    }

    /**
     * Get tags.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * Set tags.
     *
     * @param \Doctrine\Common\Collections\Collection
     */
    public function setTags($tags)
    {
        $this->tags = $tags;
    }

    //  /**
    //   * Add selected
    //   *
    //   * @param Selection $selected
    //   *
    //   * @return User
    //   */
    //  public function addSelected(Selection $selected)
    //  {
//    $this->selected[] = $selected;
//
//    return $this;
    //  }
//
    //  /**
    //   * Remove selected
    //   *
    //   * @param Selection $selected
    //   */
    //  public function removeSelected(Selection $selected)
    //  {
//    $this->selected->removeElement($selected);
    //  }
//
    //  /**
    //   * Get selected
    //   *
    //   * @return \Doctrine\Common\Collections\Collection
    //   */
    //  public function getSelected()
    //  {
//    return $this->selected;
    //  }

    /**
     * Add sentMessage.
     *
     * @param Message $sentMessage
     *
     * @return User
     */
    public function addSentMessage(Message $sentMessage)
    {
        $this->sentMessages[] = $sentMessage;

        return $this;
    }

    /**
     * Remove sentMessage.
     *
     * @param Message $sentMessage
     */
    public function removeSentMessage(Message $sentMessage)
    {
        $this->sentMessages->removeElement($sentMessage);
    }

    /**
     * Add receivedMessage.
     *
     * @param Message $receivedMessage
     *
     * @return User
     */
    public function addReceivedMessage(Message $receivedMessage)
    {
        $this->receivedMessages[] = $receivedMessage;

        return $this;
    }

    /**
     * Remove receivedMessage.
     *
     * @param Message $receivedMessage
     */
    public function removeReceivedMessage(Message $receivedMessage)
    {
        $this->receivedMessages->removeElement($receivedMessage);
    }

    /**
     * Get sentMessages.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSentMessages()
    {
        return $this->sentMessages;
    }

    /**
     * Get receivedMessages.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getReceivedMessages()
    {
        return $this->receivedMessages;
    }

    /**
     * Add domain.
     *
     * @param Domain $domain
     *
     * @return User
     */
    public function addDomain(Domain $domain)
    {
        $this->domains[] = $domain;

        return $this;
    }

    /**
     * Remove domain.
     *
     * @param Domain $domain
     */
    public function removeDomain(Domain $domain)
    {
        $this->domains->removeElement($domain);
    }

    /**
     * Get domains.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getDomains()
    {
        return $this->domains;
    }

    //  /**
    //   * Add slackAccount
    //   *
    //   * @param SlackAccount $slackAccount
    //   *
    //   * @return User
    //   */
    //  public function addSlackAccount(SlackAccount $slackAccount)
    //  {
//    $this->slackAccounts[] = $slackAccount;
//
//    return $this;
    //  }
//
    //  /**
    //   * Remove slackAccount
    //   *
    //   * @param SlackAccount $slackAccount
    //   */
    //  public function removeSlackAccount(SlackAccount $slackAccount)
    //  {
//    $this->slackAccounts->removeElement($slackAccount);
    //  }
//
    //  /**
    //   * Get slackAccounts
    //   *
    //   * @return \Doctrine\Common\Collections\Collection
    //   */
    //  public function getSlackAccounts()
    //  {
//    return $this->slackAccounts;
    //  }
//
//
    //  /**
    //   * Set slackAccounts
    //   *
    //   * @param \Doctrine\Common\Collections\Collection
    //   */
    //  public function setSlackAccounts($slackAccounts)
    //  {
//    $this->slackAccounts = $slackAccounts;
    //  }
//
//

    /**
     * Set deleted.
     *
     * @param \DateTime $deleted
     *
     * @return User
     */
    public function setDeleted($deleted)
    {
        $this->deleted = $deleted;

        return $this;
    }

    /**
     * Get deleted.
     *
     * @return \DateTime
     */
    public function getDeleted()
    {
        return $this->deleted;
    }

    /**
     * Set lastConnexion.
     *
     * @param \DateTime $lastConnexion
     *
     * @return User
     */
    public function setLastConnexion($lastConnexion)
    {
        $this->lastConnexion = $lastConnexion;

        return $this;
    }

    /**
     * Get lastConnexion.
     *
     * @return \DateTime
     */
    public function getLastConnexion()
    {
        return $this->lastConnexion;
    }

    /**
     * Set userNotified.
     *
     * @param \DateTime $userNotified
     *
     * @return User
     */
    public function setUserNotified($userNotified)
    {
        $this->userNotified = $userNotified;

        return $this;
    }

    /**
     * Get userNotified.
     *
     * @return \DateTime
     */
    public function getUserNotified()
    {
        return $this->userNotified;
    }

//    /**
//     * @return bool
//     */
//    public function isNotificationSubscribe(): bool
//    {
//        return $this->notificationSubscribe;
//    }
//
//    /**
//     * @param bool $notificationSubscribe
//     */
//    public function setNotificationSubscribe(bool $notificationSubscribe): void
//    {
//        $this->notificationSubscribe = $notificationSubscribe;
//    }
}
