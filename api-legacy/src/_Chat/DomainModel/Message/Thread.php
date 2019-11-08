<?php

namespace App\_Chat\DomainModel\Message;

use App\_Chat\DomainModel\Message\Message;
use App\_User\DomainModel\Image\Image;

class Thread
{
    public int $id;
    public Message $lastMessage;
    public string $name;
    public Image $image;

    public function __construct(int $_id, Message $lastMessage, string $name, Image $image) {
        $this->_id = $_id;
        $this->lastMessage = $lastMessage;
        $this->name = $name;
        $this->image = $image;
    }
}

