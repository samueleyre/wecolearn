<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201211102035 extends AbstractMigration
{
    public function getDescription() : string
    {
        return 'Create tags to represent tagDomains';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tagDomain ADD linked_tag_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE tagDomain ADD CONSTRAINT FK_8D1EEA799BB0041 FOREIGN KEY (linked_tag_id) REFERENCES tag (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D1EEA799BB0041 ON tagDomain (linked_tag_id)');
        $this->addSql('INSERT INTO tag (name, type, iteration, created) SELECT name,0,0, CURDATE() FROM tagDomain WHERE 1') ;
        $this->addSql('UPDATE `tagDomain` INNER JOIN tag SET `linked_tag_id`=tag.id WHERE tagDomain.name = tag.name') ;
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tagDomain DROP FOREIGN KEY FK_8D1EEA799BB0041');
        $this->addSql('DROP INDEX UNIQ_8D1EEA799BB0041 ON tagDomain');
        $this->addSql('ALTER TABLE tagDomain DROP linked_tag_id');
    }
}
