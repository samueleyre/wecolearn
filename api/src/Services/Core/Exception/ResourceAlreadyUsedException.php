<?php

namespace App\Services\Core\Exception;


class ResourceAlreadyUsedException extends \Exception
{

    public function __construct( $message ) {
        parent::__construct($message);
    }
}
