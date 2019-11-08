<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 27/03/19
 * Time: 16:05
 */

namespace Tests\Utils;


use Doctrine\ORM\EntityManagerInterface;

class TruncateDatabase
{

    public static function process( EntityManagerInterface $em ) {
        $dump_queries = [
            'SET FOREIGN_KEY_CHECKS=0;',
            'TRUNCATE TABLE user_domain;',
            'TRUNCATE TABLE fos_user',
            'TRUNCATE TABLE image',
            'TRUNCATE TABLE tag',
            'TRUNCATE TABLE cron_job',
            'TRUNCATE TABLE user_tag',
            'TRUNCATE TABLE domain',
            'TRUNCATE TABLE slackTeam',
            'TRUNCATE TABLE slackAccount',
            'SET FOREIGN_KEY_CHECKS=1;',
        ];
        foreach( $dump_queries as $query ) {
            $stmp = $em->getConnection()->prepare($query);
            $stmp->execute();
        }
    }
}
