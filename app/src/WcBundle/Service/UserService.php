<?php

namespace WcBundle\Service;

use AppBundle\Entity\User;
use \Doctrine\Common\Collections\Collection;

use Doctrine\ORM\EntityManager;

class UserService {

	public $em;

	public function __construct( EntityManager $em ) {
		$this->em = $em;
	}

  public function patch(User $user) {

    $this->em->merge( $user );
    $this->em->flush();

    return $this;


  }


}
