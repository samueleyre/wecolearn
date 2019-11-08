<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 14/03/19
 * Time: 14:27
 */

namespace App\_User\DomainModel\User;


interface Service
{

    public function process(Request $request);
}
