<?php

namespace App\Services\User\Entity;


class Selection
{
    public $id;
    public $selected = false; // false means banned from view, true means saved for later
    private $updated;
    public function __construct()
    {
        $this->users = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set selected
     *
     * @param string $selected
     *
     * @return Selection
     */
    public function setSelected($selected)
    {
        $this->selected = $selected;

        return $this;
    }

    /**
     * Get selected
     *
     * @return string
     */
    public function getSelected()
    {
        return $this->selected;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     *
     * @return Selection
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

}
