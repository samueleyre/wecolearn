<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200413163342 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        $this->addSql('ALTER TABLE `message` CHANGE `message` `message` VARCHAR(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL');
        // this up() migration is auto-generated, please modify it to your needs
    }

    public function down(Schema $schema) : void
    {
        $this->addSql('ALTER TABLE `message` CHANGE `message` `message` VARCHAR(10000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL');
        // this down() migration is auto-generated, please modify it to your needs
    }
}
