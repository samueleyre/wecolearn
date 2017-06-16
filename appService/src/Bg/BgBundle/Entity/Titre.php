<?php
namespace Bg\BgBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="titre")
 */
class Titre extends Phrase {
    
    public function __construct() {
        parent::__construct();
    }
}