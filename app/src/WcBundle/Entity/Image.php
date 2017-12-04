<?php

namespace WcBundle\Entity;

use Doctrine\ORM\Mapping as ORM;


/**
 * @ORM\Entity
 * @ORM\Table(name="image")
 */
class Image
{

    const SERVER_PATH_TO_IMAGE_FOLDER = __DIR__ .'/../../../web/img';

    private $file;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\OneToOne(targetEntity="Client", mappedBy="image")
     * @ORM\JoinColumn(name="clientId", referencedColumnName="id", onDelete="NO ACTION")
     */
    public $client;

    /**
     * @ORM\Column(type="string",name="filename")
     */
    public $filename;

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

    public function setUpdated( $update = null)
    {
        $this->updated= $update;
    }


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

        $this->getFile()->move(
            self::SERVER_PATH_TO_IMAGE_FOLDER,
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
        $this->setUpdated(new \DateTime());
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
     * Set client
     *
     * @param \WcBundle\Entity\Client $client
     *
     * @return Image
     */
    public function setClient(\WcBundle\Entity\Client $client = null)
    {
        $this->client = $client;

        return $this;
    }

    /**
     * Get client
     *
     * @return \WcBundle\Entity\Client
     */
    public function getClient()
    {
        return $this->client;
    }
}
