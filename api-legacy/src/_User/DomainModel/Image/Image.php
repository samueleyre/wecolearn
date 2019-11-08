<?php

namespace App\_User\DomainModel\Image;

use Doctrine\ORM\Mapping as ORM;


/**
 * @ORM\Entity
 * @ORM\Table(name="image")
 */
class Image
{


    private $file;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\OneToOne(targetEntity="App\_User\DomainModel\User\User", mappedBy="image")
     * @ORM\JoinColumn(name="userId", referencedColumnName="id", onDelete="NO ACTION")
     */
    public $user;

    /**
     * @ORM\Column(type="string",name="filename")
     */
    public $filename;


    /**
     * @ORM\Column(type="string",name="secureUrl", nullable=true)
     */
    public $secureUrl; //todo: Useless know, make sure updated on PROD !


    /**
     * @ORM\Column(type="string",name="publicId", nullable=true)
     */
    public $publicId;

    /**
     * @ORM\Column(type="string",name="version", nullable=true)
     */
    public $version;


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

    public function __construct() {

        $this->created = new \DateTime();

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

    public function setFile( $file = null)
    {
        $this->file = $file;
    }


    public function getFile()
    {
        return $this->file;
    }

    /**
     * Set update
     *
     * @param \DateTime $update
     *
     * @return Image
     */
    public function setUpdated( $update = null)
    {
        $this->updated= $update;

        return $this;
    }

    /**
     * Get update
     *
     * @return \DateTime
     */
    public function getUpdated()
    {
        return $this->updated;
    }

    public function setFileName( $filename = null)
    {
        $this->filename= $filename;
    }


    public function getFileName()
    {
        return $this->filename;
    }


    /**
     * Manages the copying of the file to the relevant place on the server
     */
    public function upload()
    {
        // the file property can be empty if the field is not required
        if (null === $this->getFile()) {
            return;
        }

        // we use the original file name here but you should
        // sanitize it at least to avoid any security issues

        // move takes the target directory and target filename as params
        $filename = md5(uniqid()).$this->getFile()->getClientOriginalName();
        $server_path_image_folder = __DIR__ .'/../../../web/img';

        $this->getFile()->move(
            $server_path_image_folder,
            $filename
        );

        // set the path property to the filename where you've saved the file
        $this->setFileName( $filename);
        // clean up the file property as you won't need it anymore
        $this->setFile(null);
    }

    /**
     * Lifecycle callback to upload the file to the server
     */
    public function lifecycleFileUpload()
    {
        $this->upload();
    }

    /**
     * Updates the hash value to force the preUpdate and postUpdate events to fire
     */
    public function refreshUpdated()
    {
        $this->setUpdated(new \DateTime("now", new \DateTimeZone('Europe/Paris')));
    }


    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Image
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
     * Set user
     *
     * @param \WcBundle\Entity\User $user
     *
     * @return Image
     */
    public function setUser(\App\_User\DomainModel\User\User $user = null)
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
     * Set secureUrl
     *
     * @param string $secureUrl
     *
     * @return Image
     */
    public function setSecureUrl($secureUrl)
    {
        $this->secureUrl = $secureUrl;

        return $this;
    }

    /**
     * Get secureUrl
     *
     * @return string
     */
    public function getSecureUrl()
    {
        return $this->secureUrl;
    }

    /**
     * Set publicId
     *
     * @param string $publicId
     *
     * @return Image
     */
    public function setPublicId($publicId)
    {
        $this->publicId = $publicId;

        return $this;
    }

    /**
     * Get publicId
     *
     * @return string
     */
    public function getPublicId()
    {
        return $this->publicId;
    }

    /**
     * Set version
     *
     * @param integer $version
     *
     * @return Image
     */
    public function setVersion($version)
    {
        $this->version = $version;

        return $this;
    }

    /**
     * Get version
     *
     * @return integer
     */
    public function getVersion()
    {
        return $this->version;
    }
}
