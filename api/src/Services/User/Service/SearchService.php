<?php

namespace App\Services\User\Service;

use App\Services\Tag\Entity\Tag;
use App\Services\Tag\Entity\TagDomain;
use App\Services\User\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class SearchService
{

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }


    public function search($searchParameters, $filter, User $user = null, $domain = "wecolearn"): array
    {

        $searchTag = null;
        $searchTagDomain = null;
        $latitude = null;
        $longitude = null;
        $searchParameters['searchLearnTag'] = false;
        $searchParameters['searchByLearnTagDomain'] = false;
        $searchParameters['orderByDistance'] = false;

        $retMeta = [];

        if (is_array($filter)) {
            if (array_key_exists("tag", $filter)) {
                if ($filter["tag"]['id']) {
                    $searchTag = $this->em->getRepository(Tag::class)->find($filter["tag"]['id']);
                    $searchParameters['searchLearnTag'] = true;
                } else {
                    $search = $this->em->getRepository(Tag::class)
                        ->findByNameLike($filter["tag"]['name'], 0);
                    if (count($search) === 0) {
                        $retMeta['tagNotFound'] = true;
                    } else {
                        $searchTag = $search[0];
                        $searchParameters['searchLearnTag'] = true;
                    }
                }
            } else if (array_key_exists("tagDomain", $filter)) {
                if ($filter["tagDomain"]["id"]) {
                    $searchTagDomain = $this->em->getRepository(TagDomain::class)->find($filter["tagDomain"]['id']);
                    $searchParameters['searchByLearnTagDomain'] = true;
                }
            }
            if (array_key_exists("latitude", $filter) && array_key_exists("longitude", $filter)) {
                $latitude = $filter["latitude"];
                $longitude = $filter["longitude"];
            } else {
                $latitude = ($user && null !== $user->getLatitude()) ? $user->getLatitude() : 45.75; // should not be useful
                $longitude = ($user && null !== $user->getLongitude()) ? $user->getLongitude() : 4.85; // should not be useful
            }
        }

        $result = [];

        $distances = $searchParameters['global'] ? [-1] : [5, 15]; // -1 for infinite

//      ---------------SEARCH ----------------

        // search by common tags and by several distances
        if ($searchParameters['useProfileTags']) {
            foreach($distances as $distance) {
                if ($result === []) {
                    $result = $this->searchRequest(
                        $user,
                        $filter,
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
        if ($result === [] && $searchParameters['searchLearnTag']) {
            $searchParameters['useProfileTags'] = false;
            $searchParameters['userLearnTags'] = false;
            $searchParameters['userLearnTagDomains'] = false;
            $searchParameters['userKnowTags'] = false;
            $searchParameters['userKnowTagDomains'] = false;

            $searchParameters['orderByDistance'] = true;

            $result = $this->em
                ->getRepository(User::class)
                ->search([
                    'user' => $user,
                    'searchTag' => $searchTag,
                    'first' => $filter['first'],
                    'max' => $filter['max'],
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'domain' => $domain,
                    'parameters' => $searchParameters,
                    'distance' => $searchParameters['global'] ? -1 : 15
                ]);
        }

        // search by selected tag domain only
        if ($result === [] && $searchParameters['searchByLearnTagDomain']) {
            $searchParameters['useProfileTags'] = false;
            $searchParameters['userLearnTags'] = false;
            $searchParameters['userLearnTagDomains'] = false;
            $searchParameters['userKnowTags'] = false;
            $searchParameters['userKnowTagDomains'] = false;

            $searchParameters['orderByDistance'] = true;

            $result = $this->em
                ->getRepository(User::class)
                ->search([
                    'user' => $user,
                    'searchTagDomain' => $searchTagDomain,
                    'first' => $filter['first'],
                    'max' => $filter['max'],
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'domain' => $domain,
                    'parameters' => $searchParameters,
                    'distance' => $searchParameters['global'] ? -1 : 15
                ]);
        }

        // search by all tags
        if ($result === []) {
            $searchParameters['useProfileTags'] = false;
            $searchParameters['userLearnTags'] = false;
            $searchParameters['userLearnTagDomains'] = false;
            $searchParameters['userKnowTags'] = false;
            $searchParameters['userKnowTagDomains'] = false;
            $searchParameters['searchLearnTag'] = false;
            $searchParameters['searchByLearnTagDomain'] = false;

            $searchParameters['orderByDistance'] = true;

            $result = $this->em
                ->getRepository(User::class)
                ->search([
                    'user' => $user,
                    'searchTag' => $searchTag,
                    'first' => $filter['first'],
                    'max' => $filter['max'],
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'domain' => $domain,
                    'parameters' => $searchParameters,
                    'distance' => $searchParameters['global'] ? -1 : 15
                ]);
        }

        $retMeta = array_merge($searchParameters, $retMeta);

        $result = array_map(function($res) {
            unset($res['distance']);
            return $res;
        }, $result);

        return [
            'data'=> $result,
            'meta'=> $retMeta
        ];
    }

    private function searchRequest(
        $user,
        $filter,
        $domain,
        $searchTag,
        $latitude,
        $longitude,
        $distance,
        &$searchParameters
    ) {

        $result = [];

        if ($searchParameters['userLearnTags']) {
            // search by user learn tags ( type 0 )
            $result = $this->em
                ->getRepository(User::class)
                ->search([
                    'user' => $user,
                    'searchTag' => $searchTag,
                    'first' => $filter['first'],
                    'max' => $filter['max'],
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'domain' => $domain,
                    'parameters' => $searchParameters,
                    'distance' => $distance
                ]);
            if ($result === [] && $filter['first'] === 0) {
                // first search
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
                    'first' => $filter['first'],
                    'max' => $filter['max'],
                    'latitude'=>$latitude,
                    'longitude'=>$longitude,
                    'domain'=>$domain,
                    'parameters'=>$searchParameters,
                    'distance'=>$distance
                ]);
            if ($result === [] && $filter['first'] === 0) {
                // first search
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
                    'first' => $filter['first'],
                    'max' => $filter['max'],
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'domain' => $domain,
                    'parameters' => $searchParameters,
                    'distance' => $distance
                ]);
            if ($result === [] && $filter['first'] === 0) {
                // first search
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
                    'first' => $filter['first'],
                    'max' => $filter['max'],
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
