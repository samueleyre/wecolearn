<?php

namespace WcBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="WcBundle\Repository\MessageRepository")
 * @ORM\Table(name="message")
 */
class Message
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="sentMessages")
     * @ORM\JoinColumn(name="senderId", referencedColumnName="id", onDelete="NO ACTION")
     */
    public $sender;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="receivedMessages")
     * @ORM\JoinColumn(name="receiverId", referencedColumnName="id", onDelete="NO ACTION")
     */
    public $receiver;

    /**
     * @ORM\Column(type="string", name="message", nullable=true)
     */
    public $message;

    /**
     * @ORM\Column(type="boolean", name="isRead", nullable=true)
     */
    public $isRead = false;

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
     * @ORM\Column(name="lastReminder", type="datetime", nullable=true)
     */
    private $lastReminder = null;





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
    public function setSender(\WcBundle\Entity\User $sender = null)
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
    public function setReceiver(\WcBundle\Entity\User $receiver = null)
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
}
