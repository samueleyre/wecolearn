<?php

namespace App\Services\User\Entity;

use App\Services\Chat\Entity\Message;
use App\Services\Domain\Entity\Domain;
use App\Services\Tag\Entity\Tag;
use DateTime;
use DateTimeZone;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use FOS\UserBundle\Model\User as BaseUser;

class User extends BaseUser
{
    protected $id;
    public ?string $firstName = "";
    public ?string $lastName = "";
    public bool $emailConfirmed = false;
    public $emailToken;
    public string $profilUrl = "";
    private DateTime $created;
    private ?DateTime $updated = null;
    // for client header notifications
    private ?DateTime $userUpdated;
    // for client web and email notifications
    private ?DateTime $userNotified; // not used anymore !
    public ?string $biographie = null;
    public ?int $intensity = null;
    public ?int $atmosphere = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $city = null;
    public ?Image $image = null;
    public $tags;
    public $sentMessages;
    public $receivedMessages;

    //  USER CONFIG ----------------------------------
    public bool $showProfil = false;

    // subscribe to notifications
    private bool $newMessageNotification = true;
    private bool $newMatchNotification = true;

    // subscribe to emails
    private bool $newMessageEmail = true;
    private bool $newMatchEmail = true;

    public bool $newsletter = false;
    //  public $slackAccounts;
    public $domains;
    private ?DateTime $lastConnexion;
    private ?DateTime $deleted;
    private bool $notificationSubscribe = false;
    private $subscriptions;
    private $pushNotificationSubscriptions;
    private ?string $oldEmail;

    public function __construct(array $parameters = [])
    {
        parent::__construct();

        if (array_key_exists('id', $parameters)) {
            $this->id = $parameters['id'];
        }

        $this->tags = new ArrayCollection();
        $this->created = new DateTime('now', new DateTimeZone('Europe/Paris'));
        $this->emailToken = array_key_exists('emailToken', $parameters) ? new ArrayCollection($parameters['emailToken']) : new ArrayCollection();
        $this->sentMessages = new ArrayCollection();
        $this->receivedMessages = new ArrayCollection();
        $this->subscriptions = new ArrayCollection();
        $this->pushNotificationSubscriptions = new ArrayCollection();
        $this->profilUrl = array_key_exists('profilUrl', $parameters) ? $parameters['profilUrl'] : '';
        $this->domains = array_key_exists('domains', $parameters) ? $parameters['domains'] : new ArrayCollection();
        $this->firstName = array_key_exists('firstName', $parameters) ? $parameters['firstName'] : '';
        $this->lastName = array_key_exists('lastName', $parameters) ? $parameters['lastName'] : '';
        $this->biographie = array_key_exists('biographie', $parameters) ? $parameters['biographie'] : 'null';
        $this->tags = array_key_exists('tags', $parameters) ? new ArrayCollection($parameters['tags']) : new ArrayCollection();
        $this->emailConfirmed = array_key_exists('emailConfirmed', $parameters) ? $parameters['emailConfirmed'] : false;
        $this->image = array_key_exists('image', $parameters) ? $parameters['image'] : null;

    }

    /**
     * @return ArrayCollection
     */
    public function getPushNotificationSubscriptions(): ArrayCollection
    {
        return $this->pushNotificationSubscriptions;
    }

    /**
     * @param ArrayCollection $pushNotificationSubscriptions
     */
    public function setPushNotificationSubscriptions(ArrayCollection $pushNotificationSubscriptions): void
    {
        $this->pushNotificationSubscriptions = $pushNotificationSubscriptions;
    }

    public function addPushNotificationSubscription( PushNotificationSubscription $entity ) {
        $this->pushNotificationSubscriptions->add($entity);
    }

    public function removePushNotificationSubscription( PushNotificationSubscription $entity ) {
        $this->pushNotificationSubscriptions->removeElement($entity);
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
    public function setEmailConfirmed(bool $emailConfirmed): User
    {
        $this->emailConfirmed = $emailConfirmed;

        return $this;
    }

    /**
     * Get emailConfirmed.
     *
     * @return bool
     */
    public function getEmailConfirmed(): bool
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
    public function addEmailToken(Token $emailToken): User
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
     * @return Collection
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
    public function setFirstName(string $firstName): User
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName.
     *
     * @return string
     */
    public function getFirstName(): string
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
    public function setLastName(string $lastName): User
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName.
     *
     * @return string
     */
    public function getLastName(): string
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
    public function setProfilUrl(string $profilUrl): User
    {
        $this->profilUrl = $profilUrl;

        return $this;
    }

    /**
     * Get profilUrl.
     *
     * @return string
     */
    public function getProfilUrl(): string
    {
        return $this->profilUrl;
    }

    /**
     * Set created.
     *
     * @param DateTime $created
     *
     * @return User
     */
    public function setCreated(DateTime $created): User
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
     * Set updated.
     *
     * @param DateTime $updated
     *
     * @return User
     */
    public function setUpdated($updated): User
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * Get updated.
     *
     * @return DateTime
     */
    public function getUpdated(): DateTime
    {
        return $this->updated;
    }

    /**
     * Set userUpdated.
     *
     * @param DateTime $userUpdated
     *
     * @return User
     */
    public function setUserUpdated(DateTime $userUpdated): User
    {
        $this->userUpdated = $userUpdated;

        return $this;
    }

    /**
     * Get userUpdated.
     *
     * @return DateTime | null
     */
    public function getUserUpdated(): ?DateTime
    {
        return $this->userUpdated;
    }

    /**
     * Set biographie.
     *
     * @param ?string $biographie
     *
     * @return User
     */
    public function setBiographie(?string $biographie): User
    {
        $this->biographie = $biographie;

        return $this;
    }

    /**
     * Get biographie.
     *
     * @return ?string
     */
    public function getBiographie(): ?string
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
    public function setLatitude($latitude): User
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * Get latitude.
     *
     * @return float | null
     */
    public function getLatitude(): ?float
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
    public function setLongitude($longitude): User
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * Get longitude.
     *
     * @return float | null
     */
    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    /**
     * Set city.
     *
     * @param string $city
     *
     * @return User
     */
    public function setCity($city): User
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city.
     *
     * @return string | null
     */
    public function getCity(): ?string
    {
        return $this->city;
    }

    /**
     * Set intensity.
     *
     * @param int $intensity
     *
     * @return User
     */
    public function setIntensity(int $intensity): User
    {
        $this->intensity = $intensity;

        return $this;
    }

    /**
     * Get intensity.
     *
     * @return int | null
     */
    public function getIntensity(): ?int
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
    public function setShowProfil(bool $showProfil): User
    {
        $this->showProfil = $showProfil;

        return $this;
    }

    /**
     * Get showProfil.
     *
     * @return bool
     */
    public function getShowProfil(): bool
    {
        return $this->showProfil;
    }

    /**
     * Set newMessageNotification.
     *
     * @param bool $newMessageNotification
     *
     * @return User
     */
    public function setNewMessageNotification($newMessageNotification): User
    {
        $this->newMessageNotification = $newMessageNotification;

        return $this;
    }

    /**
     * Get newMessageNotification.
     *
     * @return bool
     */
    public function getNewMessageNotification(): bool
    {
        return $this->newMessageNotification;
    }

    /**
     * Set newMessageEmail.
     *
     * @param bool $newMessageEmail
     *
     * @return User
     */
    public function setNewMessageEmail(bool $newMessageEmail): User
    {
        $this->newMessageEmail = $newMessageEmail;

        return $this;
    }

    /**
     * Get newMessageEmail.
     *
     * @return bool
     */
    public function getNewMessageEmail(): bool
    {
        return $this->newMessageEmail;
    }

    /**
     * Set image.
     *
     * @param Image|null $image
     *
     * @return User
     */
    public function setImage(Image $image = null): User
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image.
     *
     * @return Image
     */
    public function getImage(): Image
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
    public function addTag(Tag $tag): User
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
     * @return Collection
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * Set tags.
     *
     * @param Collection
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
    public function addSentMessage(Message $sentMessage): User
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
    public function addReceivedMessage(Message $receivedMessage): User
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
     * @return Collection
     */
    public function getSentMessages()
    {
        return $this->sentMessages;
    }

    /**
     * Get receivedMessages.
     *
     * @return Collection
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
    public function addDomain(Domain $domain): User
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
     * @return Collection
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
     * @param DateTime $deleted
     *
     * @return User
     */
    public function setDeleted(DateTime $deleted): User
    {
        $this->deleted = $deleted;

        return $this;
    }

    /**
     * Get deleted.
     *
     * @return DateTime | null
     */
    public function getDeleted(): ?DateTime
    {
        return $this->deleted;
    }

    /**
     * Set lastConnexion.
     *
     * @param DateTime $lastConnexion
     *
     * @return User
     */
    public function setLastConnexion(DateTime $lastConnexion): User
    {
        $this->lastConnexion = $lastConnexion;

        return $this;
    }

    /**
     * Get lastConnexion.
     *
     * @return DateTime | null
     */
    public function getLastConnexion(): ?DateTime
    {
        return $this->lastConnexion;
    }

    /**
     * Set userNotified.
     *
     * @param DateTime $userNotified
     *
     * @return User
     */
    public function setUserNotified(?DateTime $userNotified): User
    {
        $this->userNotified = $userNotified;

        return $this;
    }

    /**
     * Get userNotified.
     *
     * @return DateTime | null
     */
    public function getUserNotified(): ?DateTime
    {
        return $this->userNotified;
    }

    /**
     * @return bool
     */
    public function isNotificationSubscribe(): bool
    {
        return $this->notificationSubscribe;
    }

    /**
     * @param bool $notificationSubscribe
     */
    public function setNotificationSubscribe(bool $notificationSubscribe): void
    {
        $this->notificationSubscribe = $notificationSubscribe;
    }

    /**
     * @return ArrayCollection
     */
    public function getSubscriptions(): ArrayCollection
    {
        return $this->subscriptions;
    }

    public function addNotification( Subscription $subscription ) {
        $this->subscriptions[] = $subscription;
    }

    /**
     * @param ArrayCollection $subscriptions
     */
    public function setSubscriptions(ArrayCollection $subscriptions): void
    {
        $this->subscriptions = $subscriptions;
    }

    public function getAtmosphere(): ?int
    {
        return $this->atmosphere;
    }

    public function setAtmosphere(?int $atmosphere): self
    {
        $this->atmosphere = $atmosphere;

        return $this;
    }

    public function getNotificationSubscribe(): ?bool
    {
        return $this->notificationSubscribe;
    }

    public function addSubscription(Subscription $subscription): self
    {
        if (!$this->subscriptions->contains($subscription)) {
            $this->subscriptions[] = $subscription;
            $subscription->setUser($this);
        }

        return $this;
    }

    public function removeSubscription(Subscription $subscription): self
    {
        if ($this->subscriptions->contains($subscription)) {
            $this->subscriptions->removeElement($subscription);
            // set the owning side to null (unless already changed)
            if ($subscription->getUser() === $this) {
                $subscription->setUser(null);
            }
        }

        return $this;
    }

    public function getNewsletter(): bool
    {
        return $this->newsletter;
    }

    public function setNewsletter(bool $newsletter): self
    {
        $this->newsletter = $newsletter;

        return $this;
    }

    public function getNewMatchNotification(): bool
    {
        return $this->newMatchNotification;
    }

    public function setNewMatchNotification(bool $newMatchNotification): self
    {
        $this->newMatchNotification = $newMatchNotification;

        return $this;
    }

    public function getNewMatchEmail(): bool
    {
        return $this->newMatchEmail;
    }

    public function setNewMatchEmail(bool $newMatchEmail): self
    {
        $this->newMatchEmail = $newMatchEmail;

        return $this;
    }

    public function getOldEmail(): ?string
    {
        return $this->oldEmail;
    }

    public function setOldEmail(?string $oldEmail): self
    {
        $this->oldEmail = $oldEmail;

        return $this;
    }
}
