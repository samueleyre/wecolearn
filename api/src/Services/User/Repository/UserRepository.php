<?php

namespace App\Services\User\Repository;

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

    /**
     *  userLearnTags | userKnowTags | userLearnTagDomains | userKnowTagDomains | searchLearnTag
     * @param $parameters
     *
     * @return mixed
     */
    public function search(
        User $user = null,
        Tag $searchTag = null,
        $first,
        $max,
        $startLatitude,
        $startLongitude,
        $domain,
        $parameters,
        $maxDistance = 100
    ) {
        if (!$startLatitude || !$startLongitude) {
            $startLatitude = 45.75;
            $startLongitude = 4.85;
        }

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
        $qb->addSelect('count(t.id) as commonTags');
        $qb->addSelect(sprintf(' 
      cast(
          round(
            pow(69.1 * (user.latitude - %s), 2) +
            pow(69.1 
                * (%s - user.longitude) 
                * cos(user.latitude / 57.3), 2)
          , 2 ) AS decimal(6,2) ) AS distance', $startLatitude, $startLongitude));

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
        if (count($profileTags) > 0) {
            $condition = sprintf('t.id=%s', $profileTags[0]->getId());
            for ($i = 1; $i < count($profileTags); ++$i) {
                $condition .= sprintf(' OR t.id=%s', $profileTags[$i]->getId());
            }
            $qb->andWhere($condition);
        }

        $qb->groupBy('user.id');
        $qb->orderBy('commonTags', 'DESC');
        $qb->setFirstResult($first);
        $qb->setMaxResults($max);
        $qb->having('distance < :maxDistance')->setParameter('maxDistance', $maxDistance);

        return $qb->getQuery()->getResult();
    }
}
