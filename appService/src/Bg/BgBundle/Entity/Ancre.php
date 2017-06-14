<?php
namespace Bg\BgBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="phraseAncre")
 */
class Ancre extends Phrase {
    
    public function __construct() {
        parent::__construct();
    }
}