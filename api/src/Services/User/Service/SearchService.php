<?php

namespace App\Services\User\Service;

use App\Services\Tag\Entity\Tag;
use App\Services\User\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

class SearchService
{

    private $em;
    private $logger;

    public function __construct(EntityManagerInterface $em, LoggerInterface $logger)
    {
        $this->em = $em;
        $this->logger = $logger;
    }


    public function search(User $user = null, $filter = null, $domain = "wecolearn")
    {

        $tag = null;
        $latitude = null;
        $longitude = null;
        $first = 0;
        $max = 10;
        $tagType = 0;


        if (is_array($filter)) {
            if (array_key_exists("tag", $filter)) {
                $tagName = $filter["tag"];
                $tag = $this->em->getRepository(Tag::class)
                    ->findOneBy(["name" => $tagName, "type" => $tagType]);
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

        $this->logger->debug('first result', $result);

        // search by user tags & not only learn tags ( types 0, 1, 2 )
        if ($result === []) {
            $searchParameters['onlyLearnTags'] = false;
            $result = $this->em
                ->getRepository(User::class)
                ->search($user, $tag, $first, $max, $latitude, $longitude, $domain, $searchParameters);
        }

        $this->logger->debug('second result', $result);

        // search by input tag only
        if ($result === []) {
            $searchParameters['withUserTags'] = false;
            $result = $this->em
                ->getRepository(User::class)
                ->search($user, $tag, $first, $max, $latitude, $longitude, $domain, $searchParameters);
        }

        $this->logger->debug('third result', $result);

        return $result;
    }
}
