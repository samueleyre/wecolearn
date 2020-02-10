<?php

namespace App\Services\User\Service;

use App\Services\Tag\Entity\Tag;
use App\Services\User\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

class SearchService
{

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }


    public function search(User $user = null, $filter = null, $domain = "wecolearn")
    {

        $tag = null;
        $latitude = null;
        $longitude = null;
        $first = 0;
        $max = 10;
        $tagType = 0;
        $foundTag = false; // tag found by name in database with tag type : $tagtype


        if (is_array($filter)) {
            if (array_key_exists("tag", $filter)) {
                $tagName = $filter["tag"];
                $tag = $this->em->getRepository(Tag::class)
                    ->findOneBy(["name" => $tagName, "type" => $tagType]);
                if ($tag) {
                    $foundTag = true;
                }
            }
            if (array_key_exists("latitude", $filter) && array_key_exists("longitude", $filter)) {
                $latitude = $filter["latitude"];
                $longitude = $filter["longitude"];
            } else {
                $latitude = ($user && null !== $user->getLatitude()) ? $user->getLatitude() : 45.75;
                $longitude = ($user && null !== $user->getLongitude()) ? $user->getLongitude() : 4.85;
            }

            if (array_key_exists('first', $filter) && array_key_exists('max', $filter)) {
                $first = $filter['first'];
                $max = $filter['max'];
            }
        }
        
        $searchParameters = [
            'withUserTags' => true,
            'onlyLearnTags' => true
        ];

        // search by user tags & learn tags ( type 0 )
        $result = $this->em
            ->getRepository(User::class)
            ->search($user, $tag, $first, $max, $latitude, $longitude, $domain, $searchParameters);

        // search by user tags & not only learn tags ( types 0, 1, 2 )
        if ($result === []) {
            $searchParameters['onlyLearnTags'] = false;
            $result = $this->em
                ->getRepository(User::class)
                ->search($user, $tag, $first, $max, $latitude, $longitude, $domain, $searchParameters);
        }

        // search by input tag only
        if ($result === []) {
            $searchParameters['withUserTags'] = false;
            $result = $this->em
                ->getRepository(User::class)
                ->search($user, $tag, $first, $max, $latitude, $longitude, $domain, $searchParameters);
        }

        return [
            'data'=> $result,
            'meta'=> [
                'foundTag' => $foundTag,
            ]
        ];
    }
}
