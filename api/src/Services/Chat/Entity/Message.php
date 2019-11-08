<?php

namespace App\Services\Chat\Entity;

use App\Services\User\Entity\User;

class Message
{
    public $id;
    public $sender;
    public $receiver;
    public $message;
    public $isRead = false;
    private $created;
    private $updated;
    private $lastReminder = null;
    private $deleted = null;

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
     * Set message.
     *
     * @param string $message
     *
     * @return Message
     */
    public function setMessage($message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * Get message.
     *
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Set created.
     *
     * @param \DateTime $created
     *
     * @return Message
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
     * @return Message
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
     * Set lastReminder.
     *
     * @param \DateTime $lastReminder
     *
     * @return Message
     */
    public function setLastReminder($lastReminder)
    {
        $this->lastReminder = $lastReminder;

        return $this;
    }

    /**
     * Get lastReminder.
     *
     * @return \DateTime
     */
    public function getLastReminder()
    {
        return $this->lastReminder;
    }

    /**
     * Set sender.
     *
     * @param User $sender
     *
     * @return Message
     */
    public function setSender(User $sender = null)
    {
        $this->sender = $sender;

        return $this;
    }

    /**
     * Get sender.
     *
     * @return User
     */
    public function getSender()
    {
        return $this->sender;
    }

    /**
     * Set receiver.
     *
     * @param User $receiver
     *
     * @return Message
     */
    public function setReceiver(User $receiver = null)
    {
        $this->receiver = $receiver;

        return $this;
    }

    /**
     * Get receiver.
     *
     * @return User
     */
    public function getReceiver()
    {
        return $this->receiver;
    }

    /**
     * Set isRead.
     *
     * @param bool $isRead
     *
     * @return Message
     */
    public function setIsRead($isRead)
    {
        $this->isRead = $isRead;

        return $this;
    }

    /**
     * Get isRead.
     *
     * @return bool
     */
    public function getIsRead()
    {
        return $this->isRead;
    }

    public function getDeleted()
    {
        return $this->deleted;
    }

    /**
     * @param null $deleted
     */
    public function setDeleted($deleted): void
    {
        $this->deleted = $deleted;
    }
}
