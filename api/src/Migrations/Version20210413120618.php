<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210413120618 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE domain ADD inviteTokenId INT DEFAULT NULL, CHANGE is_main is_main TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE domain ADD CONSTRAINT FK_A7A91E0BAC5F244F FOREIGN KEY (inviteTokenId) REFERENCES token (id) ON DELETE SET NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A7A91E0BAC5F244F ON domain (inviteTokenId)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE domain DROP FOREIGN KEY FK_A7A91E0BAC5F244F');
        $this->addSql('DROP INDEX UNIQ_A7A91E0BAC5F244F ON domain');
        $this->addSql('ALTER TABLE domain DROP inviteTokenId, CHANGE is_main is_main TINYINT(1) DEFAULT NULL');
    }
}
