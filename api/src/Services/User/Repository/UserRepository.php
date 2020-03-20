<?php

namespace App\Services\User\Repository;

use App\Services\Tag\Entity\TagDomain;
use App\Services\User\Entity\User;
use App\Services\Tag\Entity\Tag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

//          User $user = null,
////        Tag $searchTag = null,
////        $first = 0,
////        $max = 15,
////        $latitude = null,
////        $longitude = null,
////        $domain = wecolearn,
////        $parameters = [ userLearnTags | userKnowTags | userLearnTagDomains | userKnowTagDomains | searchLearnTag ],
////        $maxDistance = 100

    /**
     * @param $searchParameters
     * @return array|mixed
     */
    public function search(
      $searchParameters
    ) {

        if (!array_key_exists('latitude', $searchParameters) || !array_key_exists('longitude', $searchParameters)) {
            $latitude = 45.75;
            $longitude = 4.85;
        } else {
            $latitude = $searchParameters['latitude'];
            $longitude = $searchParameters['longitude'];
        }

        if (!array_key_exists('domain', $searchParameters)) {
            $domain = 'wecolearn';
        } else {
            $domain = $searchParameters['domain'];
        }

        if (!array_key_exists('user', $searchParameters)) {
            $user = null;
        } else {
            $user = $searchParameters['user'];
        }

        if (!array_key_exists('searchTag', $searchParameters)) {
            $searchTag = null;
        } else {
            $searchTag = $searchParameters['searchTag'];
        }

        if (!array_key_exists('first', $searchParameters)) {
            $first = 0;
        } else {
            $first = $searchParameters['first'];
        }

        if (!array_key_exists('max', $searchParameters)) {
            $max = 15;
        } else {
            $max = $searchParameters['max'];
        }

        if (!array_key_exists('maxDistance', $searchParameters)) {
            $maxDistance = 100;
        } else {
            $maxDistance = $searchParameters['maxDistance'];
        }

        $parameters = $searchParameters['parameters'];

        $profileTags = [];

        if ($user) {
            $profileTags = $user->getTags();

            // if only learnTags
            if ($parameters['userLearnTags'] || $parameters['userLearnTagDomains'] && !($parameters['userKnowTags'] || $parameters['userKnowTagDomains'])) {
                $profileTags = $profileTags->filter(function (Tag $tag) {
                    return $tag->getType() === 0;
                });
            }

            // if only knowTags
            else if ($parameters['userKnowTags'] || $parameters['userKnowTagDomains'] && !($parameters['userLearnTags'] || $parameters['userLearnTagDomains'])) {
                $profileTags = $profileTags->filter(function (Tag $tag) {
                    return $tag->getType() === 1;
                });
            }
        }

        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('user');
        $qb->addSelect('count(DISTINCT t.id) as commonTags');
        $qb->addSelect(sprintf(' 
      cast(
          round(
            pow(69.1 * (user.latitude - %s), 2) +
            pow(69.1 
                * (%s - user.longitude) 
                * cos(user.latitude / 57.3), 2)
          , 2 ) AS decimal(6,2) ) AS distance', $latitude, $longitude));

        $qb->from('App\\Services\\User\\Entity\\User', 'user');

        $qb->innerJoin('user.tags', 't');

        if ($domain) {
            $qb->innerJoin('user.domains', 'd');
        }

        $qb->Where('user.showProfil = :showProfil')->setParameter('showProfil', 1);

        // not current user
        if ($user) {
            $qb->andWhere('user.id != :userId')->setParameter('userId', $user->getId());
        }

        if ($searchTag) {
            $qb->andWhere(sprintf('t.id=%s', $searchTag->getId()));
        }

        if ($domain) {
            $qb->andWhere('d.name = :s')->setParameter('s', $domain);
        }

        // search for same tags from profile
        if (
            $parameters['userLearnTags'] || $parameters['userKnowTags']
        ) {
            if (count($profileTags) === 0) {
                return [];
            }
            $condition = sprintf('t.id=%s', $profileTags[0]->getId());
            for ($i = 1; $i < count($profileTags); ++$i) {
                $condition .= sprintf(' OR t.id=%s', $profileTags[$i]->getId());
            }
            $qb->andWhere($condition);
        }

        // search for same domain tags from profile
        if (
            count($profileTags) &&
            ($parameters['userLearnTagDomains'] || $parameters['userKnowTagDomains'])
        ) {
            if ($parameters['userLearnTagDomains']) {
                $qb->andWhere(sprintf('t.type=0'));
            }
            if ($parameters['userKnowTagDomains']) {
                $qb->andWhere(sprintf('t.type=1'));
            }
            $qb->addSelect('count( DISTINCT tagDomain.id) as commonTagDomains');
            $qb->innerJoin('t.tagDomain', 'tagDomain');
            $profileTagDomains = $profileTags
                ->map(function(Tag $t) {
                    return $t->getTagDomain();
                })
                ->filter(function($tg) {
                    return $tg;
                });

            if (count($profileTagDomains) === 0) {
                return [];
            }
            $condition = sprintf('tagDomain.id=%s', $profileTagDomains[0]->getId());
            for ($i = 1; $i < count($profileTagDomains); ++$i) {
                if ($profileTagDomains[$i]) { // quick fix related to profileTagDomains auto duplicate nullifying
                    $condition .= sprintf(' OR tagDomain.id=%s', $profileTagDomains[$i]->getId());
                }
            }
            $qb->andWhere($condition);

        }

        $qb->groupBy('user.id');

        if ($parameters['orderByDistance'] ) {
            $qb->orderBy('distance', 'ASC');
        }

        else if (
            $parameters['userLearnTags'] || $parameters['userKnowTags']
        ) {
            $qb->orderBy('commonTags', 'DESC');
        }

        else if (
            $parameters['userLearnTagDomains'] || $parameters['userKnowTagDomains']
        ) {
            $qb->orderBy('commonTagDomains', 'DESC');
        }

        $qb->setFirstResult($first);
        $qb->setMaxResults($max);
        $qb->having('distance < :maxDistance')->setParameter('maxDistance', $maxDistance);

        return $qb->getQuery()->getResult();
    }
}
