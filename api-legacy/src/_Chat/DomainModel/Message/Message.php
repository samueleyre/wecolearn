<?php

namespace App\_Chat\DomainModel\Message;

use Doctrine\ORM\Mapping as ORM;


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
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set message
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
     * Get message
     *
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Set created
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
     * @return Message
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
     * Set lastReminder
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
     * Get lastReminder
     *
     * @return \DateTime
     */
    public function getLastReminder()
    {
        return $this->lastReminder;
    }



    /**
     * Set sender
     *
     * @param \WcBundle\Entity\User $sender
     *
     * @return Message
     */
    public function setSender(\App\_User\DomainModel\User\User $sender = null)
    {
        $this->sender = $sender;

        return $this;
    }

    /**
     * Get sender
     *
     * @return \WcBundle\Entity\User
     */
    public function getSender()
    {
        return $this->sender;
    }

    /**
     * Set receiver
     *
     * @param \WcBundle\Entity\User $receiver
     *
     * @return Message
     */
    public function setReceiver(\App\_User\DomainModel\User\User $receiver = null)
    {
        $this->receiver = $receiver;

        return $this;
    }

    /**
     * Get receiver
     *
     * @return \WcBundle\Entity\User
     */
    public function getReceiver()
    {
        return $this->receiver;
    }

    /**
     * Set isRead
     *
     * @param boolean $isRead
     *
     * @return Message
     */
    public function setIsRead($isRead)
    {
        $this->isRead = $isRead;

        return $this;
    }

    /**
     * Get isRead
     *
     * @return boolean
     */
    public function getIsRead()
    {
        return $this->isRead;
    }

    /**
     * @return null
     */
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
