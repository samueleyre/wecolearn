<?php

namespace App\Services\User\Repository;

use App\Services\Tag\Entity\TagDomain;
use App\Services\User\Entity\User;
use App\Services\Tag\Entity\Tag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Persistence\ManagerRegistry;
use Exception;

class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

//         User $user = null,
//        Tag $searchTag = null,
//        TagDomain $searchTagDomain = null,
//        $first = 0,
//        $max = 15,
//        $latitude = null,
//        $longitude = null,
//        $domainId = null,
//        $parameters = [ userLearnTags | userKnowTags | userLearnTagDomains | userKnowTagDomains | searchLearnTag ],
//        $distance = 100

    /**
     * @param $searchParameters
     * @return array|mixed
     */
    public function search(
        $searchParameters
    )
    {

        if (!array_key_exists('latitude', $searchParameters) || !array_key_exists('longitude', $searchParameters)) {
            $latitude = 45.75;
            $longitude = 4.85;
        } else {
            $latitude = $searchParameters['latitude'];
            $longitude = $searchParameters['longitude'];
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

        if (!array_key_exists('searchTagDomain', $searchParameters)) {
            $searchTagDomain = null;
        } else {
            $searchTagDomain = $searchParameters['searchTagDomain'];
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

        if (!array_key_exists('distance', $searchParameters)) {
            $maxDistance = 100;
        } else {
            $maxDistance = $searchParameters['distance'];
        }

        $parameters = $searchParameters['parameters'];

        $domainId = array_key_exists('domainId', $parameters) ? $parameters['domainId'] : null;

        $profileTags = [];

        if ($user) {
            $profileTags = $user->getTags();

            // if only learnTags
            if (
                ($parameters['userLearnTags'] || $parameters['userLearnTagDomains'])
                && !($parameters['userKnowTags'] || $parameters['userKnowTagDomains'])
                && $profileTags
            ) {
                $profileTags = $profileTags->filter(function (Tag $tag) {
                    return $tag->getType() === 0;
                });
            } // if only knowTags
            else if (
                ($parameters['userKnowTags'] || $parameters['userKnowTagDomains'])
                && !($parameters['userLearnTags'] || $parameters['userLearnTagDomains'])
                && $profileTags
            ) {
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

        if ($searchTagDomain) {
            $qb->innerJoin('t.tagDomains', 'tagDomain');
        }

        if ($domainId) {
            $qb->innerJoin('user.domains', 'd');
        }

        $qb->Where('user.showProfil = :showProfil')->setParameter('showProfil', 1);

        $qb->andWhere('user.deleted IS NULL');

        // not current user
        if ($user) {
            $qb->andWhere('user.id != :userId')->setParameter('userId', $user->getId());
        }

        if ($searchTag) {
            $qb->andWhere(sprintf('t.id=%s', $searchTag->getId()));
        }

        if ($searchTagDomain) {
            $qb->andWhere(sprintf('tagDomain.id=%s', $searchTagDomain->getId()));
        }

        if ($domainId) {
            $qb->andWhere('d.id = :s')->setParameter('s', $domainId);
        }

        // search for same tags from profile
        if (
            $parameters['userLearnTags'] || $parameters['userKnowTags']
        ) {
            if (count($profileTags) === 0) {
                return [];
            }
            $condition = sprintf('t.id=%s', $profileTags->first()->getId());
            for ($i = 1; $i < count($profileTags); ++$i) {
                $condition .= sprintf(' OR t.id=%s', $profileTags->getValues()[$i]->getId());
            }
            $qb->andWhere($condition);
        }

        // search for same domain tags from profile
        if ($parameters['userLearnTagDomains'] || $parameters['userKnowTagDomains']) {
            if (count($profileTags) === 0) {
                return [];
            }
            if ($parameters['userLearnTagDomains']) {
                $qb->andWhere(sprintf('t.type=0'));
            }
            if ($parameters['userKnowTagDomains']) {
                $qb->andWhere(sprintf('t.type=1'));
            }
            $qb->addSelect('count( DISTINCT tagDomain.id) as commonTagDomains');
            $qb->innerJoin('t.tagDomains', 'tagDomain');
            $profileTagDomains = new ArrayCollection();

            foreach ($profileTags as $t) {
                if (count($t->getTagDomains()) > 0) {
                    foreach ($t->getTagDomains() as $td) {
                        if (!$profileTagDomains->contains($td)) {
                            $profileTagDomains->add($td);
                        }
                    };
                }
            }

            if (count($profileTagDomains) === 0) {
                return [];
            }
            $condition = sprintf('tagDomain.id=%s', $profileTagDomains->first()->getId());
            for ($i = 1; $i < count($profileTagDomains); ++$i) {
                $condition .= sprintf(' OR tagDomain.id=%s', $profileTagDomains->getValues()[$i]->getId());
            }
            $qb->andWhere($condition);

        }

        $qb->groupBy('user.id');

        if ($parameters['orderByDistance']) {
            $qb->orderBy('distance', 'ASC');
        } else if (
            $parameters['userLearnTags'] || $parameters['userKnowTags']
        ) {
            $qb->orderBy('commonTags', 'DESC');
        } else if (
            count($profileTags) &&
            ($parameters['userLearnTagDomains'] || $parameters['userKnowTagDomains'])
        ) {
            $qb->orderBy('commonTagDomains', 'DESC');
        }

        $qb->setFirstResult($first);
        $qb->setMaxResults($max);
        if ($maxDistance !== -1) {
            $qb->having('distance < :maxDistance')->setParameter('maxDistance', $maxDistance);
        }

        return $qb->getQuery()->getResult();
    }

    /**
     * @return User[]
     * @throws Exception
     */
    public function getDeletedUsers(): array
    {

        $thirtyDaysEarlier = new \DateTime('- 30 Days', new \DateTimeZone('Europe/Paris'));

        return $this->createQueryBuilder('user')
        ->where('user.deleted IS NOT null')
        ->andWhere('user.deleted < :date')->setParameter('date', $thirtyDaysEarlier)
        ->getQuery()->getResult();

    }

    /**
     * @return User[]
     * @throws Exception
     */
    public function getNewUsers(): array
    {

        $twoDaysEarlier = new \DateTime('- 2 Days', new \DateTimeZone('Europe/Paris'));

        return $this->createQueryBuilder('user')
        ->where('user.created > :date')->setParameter('date', $twoDaysEarlier)
        ->getQuery()->getResult();

    }


    public function findEnabledByCommunity($communityId, $adminIncluded = false)
    {
        $qb = $this->createQueryBuilder('user')
            ->innerJoin('user.domains', 'community')
            ->where("community.id = :c_id")->setParameter('c_id', $communityId)
            ->andWhere('user.enabled = true')
            ->andWhere('user.deleted is NULL');

        if (!$adminIncluded) {
            $qb->andWhere('user.roles not like :role')->setParameter('role', "%ADMIN%");
        }

        return $qb->orderBy('user.created', 'DESC')
            ->getQuery()->getResult();

    }

    public function countInCommunity($communityId, $enabled = true)
    {
        return $this->createQueryBuilder('user')
            ->select('count(user)')
            ->innerJoin('user.domains', 'community')
            ->where("community.id = :c_id")->setParameter('c_id', $communityId)
            ->andWhere('user.enabled = :enabled')->setParameter('enabled', $enabled)
            ->andWhere('user.roles not like :role')->setParameter('role', "%ADMIN%")
            ->getQuery()->getSingleScalarResult();
    }

    public function countPastWeekNewUsersInCommunity($communityId, $enabled = true)
    {

        $lastWeek = new \DateTime('- 7 Days', new \DateTimeZone('Europe/Paris'));

        return $this->createQueryBuilder('user')
            ->select('count(user)')
            ->innerJoin('user.domains', 'community')
            ->andWhere('user.created > :lastWeek')->setParameter('lastWeek', $lastWeek)
            ->andWhere('user.enabled = :enabled')->setParameter('enabled', $enabled)
            ->andWhere('user.roles not like :role')->setParameter('role', "%ADMIN%")
            ->andWhere("community.id = :c_id")->setParameter('c_id', $communityId)
            ->getQuery()->getSingleScalarResult();
    }
}
