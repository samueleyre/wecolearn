<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;

class ClientTag extends Command
{

    public function __construct( EntityManagerInterface $em )
    {

        $this->em = $em;
        parent::__construct();

    }

    protected function configure()
    {
        $this
            ->setName('app:ct')
            ->setDescription('Set user_tag');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $query = " SELECT * FROM client_tag WHERE tag_id != 23 GROUP BY user_id ";

        $stmp = $this->em->getConnection()->prepare( $query );
        $stmp->execute();
        $rows = $stmp->fetchAll();

        foreach( $rows as $row ) {
          $query = sprintf(
            "
            UPDATE client_tag
            SET tag_id = 23
            WHERE client_id = %d
            AND tag_id = %d", $row['client_id'], $row['tag_id']);

          $stmp = $this->em->getConnection()->prepare( $query );
          $stmp->execute();

        }

      }
}
