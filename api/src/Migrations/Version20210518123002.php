<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210518123002 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fos_user ADD admin_domain_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE fos_user ADD CONSTRAINT FK_957A6479F8A80BD7 FOREIGN KEY (admin_domain_id) REFERENCES domain (id)');
        $this->addSql('CREATE INDEX IDX_957A6479F8A80BD7 ON fos_user (admin_domain_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fos_user DROP FOREIGN KEY FK_957A6479F8A80BD7');
        $this->addSql('DROP INDEX IDX_957A6479F8A80BD7 ON fos_user');
        $this->addSql('ALTER TABLE fos_user DROP admin_domain_id');
    }
}
