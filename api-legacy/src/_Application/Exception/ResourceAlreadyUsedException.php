<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 23/03/19
 * Time: 13:31
 */

namespace App\_Application\Exception;


class ResourceAlreadyUsedException extends \Exception
{

    public function __construct( $message ) {
        parent::__construct($message);
    }
}
