<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200929153902 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE tagDomain_tag (tag_id INT NOT NULL, tagDomain_id INT NOT NULL, INDEX IDX_ABDA0E03BAD26311 (tag_id), INDEX IDX_ABDA0E038B5FB2FD (tagDomain_id), PRIMARY KEY(tag_id, tagDomain_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('INSERT INTO `tagDomain_tag`(`tag_id`, `tagDomain_id`) SELECT id, tagDomainId FROM tag where tag.tagDomainId IS NOT null ');
        $this->addSql('ALTER TABLE tagDomain_tag ADD CONSTRAINT FK_ABDA0E03BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id)');
        $this->addSql('ALTER TABLE tagDomain_tag ADD CONSTRAINT FK_ABDA0E038B5FB2FD FOREIGN KEY (tagDomain_id) REFERENCES tagDomain (id)');
        $this->addSql('ALTER TABLE tag DROP FOREIGN KEY FK_389B7838C49AE72');
        $this->addSql('DROP INDEX IDX_389B7838C49AE72 ON tag');
        $this->addSql('ALTER TABLE tag DROP tagDomainId');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE tagDomain_tag');
        $this->addSql('ALTER TABLE tag ADD tagDomainId INT DEFAULT NULL');
        $this->addSql('ALTER TABLE tag ADD CONSTRAINT FK_389B7838C49AE72 FOREIGN KEY (tagDomainId) REFERENCES tagDomain (id) ON DELETE SET NULL');
        $this->addSql('CREATE INDEX IDX_389B7838C49AE72 ON tag (tagDomainId)');
    }
}
