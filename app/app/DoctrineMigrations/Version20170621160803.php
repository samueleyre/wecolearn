<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20170621160803 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE masse (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('DROP TABLE down_blog');
        $this->addSql('DROP TABLE host');
        $this->addSql('DROP TABLE proxy');
        $this->addSql('ALTER TABLE phraseClef CHANGE phrase phrase VARCHAR(600) NOT NULL');
        $this->addSql('ALTER TABLE programmation ADD idMasse INT DEFAULT NULL, DROP idProxy, CHANGE used used INT NOT NULL, CHANGE isPage isPage INT NOT NULL, CHANGE titleOption titleOption INT NOT NULL, CHANGE isException isException INT NOT NULL');
        $this->addSql('ALTER TABLE programmation ADD CONSTRAINT FK_5E9F80E35CA3FE71 FOREIGN KEY (idMasse) REFERENCES masse (id)');
        $this->addSql('CREATE INDEX IDX_5E9F80E35CA3FE71 ON programmation (idMasse)');
        $this->addSql('ALTER TABLE blog DROP type, DROP idHost, DROP hostRank, DROP idBlogger');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE programmation DROP FOREIGN KEY FK_5E9F80E35CA3FE71');
        $this->addSql('CREATE TABLE down_blog (name VARCHAR(255) NOT NULL COLLATE utf8_general_ci, url VARCHAR(255) NOT NULL COLLATE utf8_general_ci, date DATE NOT NULL) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE host (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(20) NOT NULL COLLATE utf8_general_ci, ftpLogin VARCHAR(20) NOT NULL COLLATE utf8_general_ci, ftpPassword VARCHAR(20) NOT NULL COLLATE utf8_general_ci, accountLogin VARCHAR(20) NOT NULL COLLATE utf8_general_ci, accountPassword VARCHAR(20) NOT NULL COLLATE utf8_general_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE proxy (id INT AUTO_INCREMENT NOT NULL, proxy VARCHAR(255) NOT NULL COLLATE utf8_general_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('DROP TABLE masse');
        $this->addSql('ALTER TABLE blog ADD type INT NOT NULL, ADD idHost INT NOT NULL, ADD hostRank INT NOT NULL, ADD idBlogger VARCHAR(255) DEFAULT \'0\' NOT NULL COLLATE utf8_general_ci');
        $this->addSql('ALTER TABLE phraseClef CHANGE phrase phrase VARCHAR(255) NOT NULL COLLATE utf8_general_ci');
        $this->addSql('DROP INDEX IDX_5E9F80E35CA3FE71 ON programmation');
        $this->addSql('ALTER TABLE programmation ADD idProxy INT NOT NULL, DROP idMasse, CHANGE isException isException INT DEFAULT 0 NOT NULL, CHANGE isPage isPage INT DEFAULT 0 NOT NULL, CHANGE titleOption titleOption INT DEFAULT 0 NOT NULL, CHANGE used used INT DEFAULT 0 NOT NULL');
    }
}
