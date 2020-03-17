<?php

namespace App\Services\User\Service;

use App\Services\Tag\Entity\Tag;
use App\Services\User\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
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

        $searchTag = null;
        $latitude = null;
        $longitude = null;
        $first = 0;
        $max = 10;
        $tagType = 0;
        $meta = [];

        $searchParameters = [
            'userLearnTags'=>true,
            'userKnowTags'=>false,
            'userLearnTagDomains'=>false,
            'userKnowTagDomains'=>false,
            'searchLearnTag'=>false,
        ];

        if (is_array($filter)) {
            if (array_key_exists("tag", $filter)) {
                if ($filter["tag"]['id']) {
                    $searchTag = $this->em->getRepository(Tag::class)->find($filter["tag"]['id']);
                    $searchParameters['searchLearnTag'] = true;
                } else {
                    $searchTag = $this->em->getRepository(Tag::class)
                        ->findOneBy(["name" => $filter["tag"]['name'], "type" => $tagType]);
                    if (!$searchTag) {
                        $meta['tagNotFound'] = true;
                    } else {
                        $searchParameters['searchLearnTag'] = true;
                    }
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

        // search by user learn tags ( type 0 )
        $result = $this->em
            ->getRepository(User::class)
            ->search($user, $searchTag, $first, $max, $latitude, $longitude, $domain, $searchParameters);

        // search by learn tag domains ( type 0 )
        if ($result === []) {
            $searchParameters['userLearnTags'] = false;
            $searchParameters['userKnowTags'] = false;
            $searchParameters['userLearnTagDomains'] = true;
            $result = $this->em
                ->getRepository(User::class)
                ->search($user, $searchTag, $first, $max, $latitude, $longitude, $domain, $searchParameters);
        }

        // search by user know tags ( types 1 )
        if ($result === []) {
            $searchParameters['userKnowTags'] = true;
            $searchParameters['userLearnTagDomains'] = false;
            $result = $this->em
                ->getRepository(User::class)
                ->search($user, $searchTag, $first, $max, $latitude, $longitude, $domain, $searchParameters);
        }

        // search by know tag domains ( type 1 )
        if ($result === []) {
            $searchParameters['userLearnTagDomains'] = false;
            $searchParameters['userKnowTagDomains'] = true;
            $result = $this->em
                ->getRepository(User::class)
                ->search($user, $searchTag, $first, $max, $latitude, $longitude, $domain, $searchParameters);
        }

        // search by input tag only
        if ($result === []) {
            $searchParameters['userKnowTags'] = false;
            $searchParameters['userKnowTagDomains'] = false;
            $result = $this->em
                ->getRepository(User::class)
                ->search($user, $searchTag, $first, $max, $latitude, $longitude, $domain, $searchParameters);
        }

        $meta = array_merge($searchParameters, $meta);

        $result = array_map(function($res) {
            unset($res['distance']);
            return $res;
        }, $result);

        return [
            'data'=> $result,
            'meta'=> $meta
        ];


    }
}
