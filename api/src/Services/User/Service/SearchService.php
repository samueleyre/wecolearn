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
        $meta = [];
        $searchParameters = [
            'userLearnTags'=>true,
            'userKnowTags'=>false,
            'userLearnTagDomains'=>false,
            'userKnowTagDomains'=>false,
            'searchLearnTag'=>false,
            'orderByDistance'=>false,
        ];
        $global = false;
        $useProfileTags = true;

        if (is_array($filter)) {
            if (array_key_exists("tag", $filter)) {
                if ($filter["tag"]['id']) {
                    $searchTag = $this->em->getRepository(Tag::class)->find($filter["tag"]['id']);
                    $searchParameters['searchLearnTag'] = true;
                } else {
                    $search = $this->em->getRepository(Tag::class)
                        ->findByNameLike($filter["tag"]['name'], 0);
                    if (count($search) === 0) {
                        $meta['tagNotFound'] = true;
                    } else {
                        $searchTag = $search[0];
                        $searchParameters['searchLearnTag'] = true;
                    }
                }
            }
            if (array_key_exists("latitude", $filter) && array_key_exists("longitude", $filter)) {
                $latitude = $filter["latitude"];
                $longitude = $filter["longitude"];
            } else {
                $latitude = ($user && null !== $user->getLatitude()) ? $user->getLatitude() : 45.75; // should not be useful
                $longitude = ($user && null !== $user->getLongitude()) ? $user->getLongitude() : 4.85; // should not be useful
            }

            if (array_key_exists('first', $filter) && array_key_exists('max', $filter)) {
                $first = $filter['first'];
                $max = $filter['max'];
            }

            if (array_key_exists('global', $filter)) {
                $global = $filter['global'];
            }

            if (array_key_exists('useProfileTags', $filter)) {
                $useProfileTags = $filter['useProfileTags'];
            }
        }

        $result = [];

        $distances = $global ? [-1] : [5, 15]; // -1 for infinite
        if ($useProfileTags) {
            foreach($distances as $distance) {
                if ($result === []) {
                    $result = $this->searchRequest(
                        $user,
                        $first,
                        $max,
                        $domain,
                        $searchTag,
                        $latitude,
                        $longitude,
                        $distance,
                        $searchParameters
                    );
                }
            }
        }

        // search by input tag only
        if ($result === []) {
            $searchParameters['userLearnTags'] = false;
            $searchParameters['userLearnTagDomains'] = false;
            $searchParameters['userKnowTags'] = false;
            $searchParameters['userKnowTagDomains'] = false;
            $searchParameters['searchLearnTag'] = true;
            $searchParameters['orderByDistance'] = true;
            $result = $this->em
                ->getRepository(User::class)
                ->search([
                    'user' => $user,
                    'searchTag' => $searchTag,
                    'first' => $first,
                    'max' => $max,
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'domain' => $domain,
                    'parameters' => $searchParameters,
                    'distance' => $global ? -1 : 15
                ]);
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

    private function searchRequest(
        $user,
        $first,
        $max,
        $domain,
        $searchTag,
        $latitude,
        $longitude,
        $distance,
        &$searchParameters = [
            'userLearnTags'=>true,
            'userKnowTags'=>false,
            'userLearnTagDomains'=>false,
            'userKnowTagDomains'=>false,
            'searchLearnTag'=>false,
            'orderByDistance'=>false,
        ]
    ) {

        if ($searchParameters['userLearnTags']) {
            // search by user learn tags ( type 0 )
            $result = $this->em
                ->getRepository(User::class)
                ->search([
                    'user' => $user,
                    'searchTag' => $searchTag,
                    'first' => $first,
                    'max' => $max,
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'domain' => $domain,
                    'parameters' => $searchParameters,
                    'distance' => $distance
                ]);
            if ($result === []) {
                $searchParameters['userLearnTags'] = false;
                $searchParameters['userLearnTagDomains'] = true;
            }
        }
        // search by learn tag domains ( type 0 )
        if ($searchParameters['userLearnTagDomains']) {
            $result = $this->em
                ->getRepository(User::class)
                ->search([
                    'user'=>$user,
                    'searchTag'=>$searchTag,
                    'first'=>$first,
                    'max'=>$max,
                    'latitude'=>$latitude,
                    'longitude'=>$longitude,
                    'domain'=>$domain,
                    'parameters'=>$searchParameters,
                    'distance'=>$distance
                ]);
            if ($result === []) {
                $searchParameters['userLearnTagDomains'] = false;
                $searchParameters['userKnowTags'] = true;
            }
        }

        // search by user know tags ( types 1 )
        if ($searchParameters['userKnowTags']) {
            $result = $this->em
                ->getRepository(User::class)
                ->search([
                    'user' => $user,
                    'searchTag' => $searchTag,
                    'first' => $first,
                    'max' => $max,
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'domain' => $domain,
                    'parameters' => $searchParameters,
                    'distance' => $distance
                ]);
            if ($result === []) {
                $searchParameters['userLearnTagDomains'] = false;
                $searchParameters['userKnowTagDomains'] = true;
            }
        }

        // search by know tag domains ( type 1 )
        if ($searchParameters['userKnowTagDomains']) {
            $result = $this->em
                ->getRepository(User::class)
                ->search([
                    'user' => $user,
                    'searchTag' => $searchTag,
                    'first' => $first,
                    'max' => $max,
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'domain' => $domain,
                    'parameters' => $searchParameters,
                    'distance' => $distance
                ]);
        }

        return $result;
    }
}
