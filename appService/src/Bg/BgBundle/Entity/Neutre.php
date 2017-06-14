<?php
namespace Bg\BgBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="phraseNeutre")
 */
class Neutre extends Phrase {
    
}