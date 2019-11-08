<?php

namespace App\WcBundle\Service;

use App\Entity\SlackAccount;
use App\Entity\SlackTeam;
use Doctrine\ORM\EntityManagerInterface;

class SlackService
{

  private $em;

  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
  }


  public function getSlackAccount($id) {

    return $this->em->getRepository(SlackAccount::class)->findOneBy(["accountId"=>$id]);

  }

  public function createSlackAccount($client, $id, $teamId, $type = "slack", $teamName=null)  {

    $newSlackAccount = new SlackAccount();
    $newSlackAccount->setUser($client);
    $newSlackAccount->setAccountId($id);
    $slackTeam = $this->getSlackTeam($teamId);
    if (!$slackTeam) {
      $slackTeam = $this->createSlackTeam($teamId, $type,  $teamName);
    }
    $newSlackAccount->setSlackTeam($slackTeam);
    $this->em->merge( $newSlackAccount );
    $this->em->flush();
    return $newSlackAccount;

  }

  public function getSlackTeam($slackTeamId) {

    return $this->em->getRepository(SlackTeam::class)->findOneBy(['teamId'=>$slackTeamId]);

  }

  public function createSlackTeam($slackTeamId, $type,  $name = null) {

    $newSlackTeam = new SlackTeam();
    $newSlackTeam->setName($name);
    $newSlackTeam->setTeamId($slackTeamId);
    $newSlackTeam->setType($type);
    return $newSlackTeam;

  }

  public function patchSlackAccount(&$slackAccount) {
    $this->em->merge($slackAccount);
    $this->em->flush();
  }


}
