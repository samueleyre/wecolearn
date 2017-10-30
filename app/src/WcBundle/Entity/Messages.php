<?php

namespace WcBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="WcBundle\Repository\MessageRepository")
 * @ORM\Table(name="client")
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
     * @ORM\OneToOne(targetEntity="WcBundle\Entity\Client")
     * @ORM\JoinColumn(name="senderId", referencedColumnName="id")
     */
    public $sender;

    /**
     * @ORM\OneToOne(targetEntity="WcBundle\Entity\Client")
     * @ORM\JoinColumn(name="receiverId", referencedColumnName="id")
     */
    public $receiver;

    /**
     * @ORM\Column(type="string", name="message", nullable=true)
     */
    public $message;

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



}
