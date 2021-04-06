<?php

namespace App\Services\Core\DataFixtures\ORM\Constant;

class CommunityOrmConstant
{
    public static array $COMMUNITIES = [
        [
            'name' => 'Wecolearn',
            'is_main'=> true
        ],
        [
            'name' => 'Coworking Lyon',
            'is_main'=> false
        ],
        [
            'name' => "Club d'échecs",
            'is_main'=> false
        ]

    ];
}
