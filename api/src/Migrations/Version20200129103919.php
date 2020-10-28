<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200129103919 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE CronReport DROP FOREIGN KEY FK_E8516938BE04EA9');
        $this->addSql('ALTER TABLE slackAccount DROP FOREIGN KEY FK_8B624F10356D6084');
        $this->addSql('CREATE TABLE subscription (id INT AUTO_INCREMENT NOT NULL, endpoint VARCHAR(255) NOT NULL, auth VARCHAR(255) NOT NULL, p256dh VARCHAR(255) NOT NULL, agent VARCHAR(255) NOT NULL, userId INT NOT NULL, INDEX IDX_A3C664D364B64DCC (userId), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE cron_job_result (id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL, cron_job_id BIGINT UNSIGNED NOT NULL, run_at DATETIME NOT NULL, run_time DOUBLE PRECISION NOT NULL, status_code INT NOT NULL, output LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_2CD346EE79099ED8 (cron_job_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE cron_job (id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL, command VARCHAR(255) NOT NULL, arguments VARCHAR(255) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, number INT DEFAULT 1 NOT NULL, period VARCHAR(255) NOT NULL, last_use DATETIME DEFAULT NULL, next_run DATETIME NOT NULL, enable TINYINT(1) DEFAULT \'1\' NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE subscription ADD CONSTRAINT FK_A3C664D364B64DCC FOREIGN KEY (userId) REFERENCES fos_user (id)');
        $this->addSql('ALTER TABLE cron_job_result ADD CONSTRAINT FK_2CD346EE79099ED8 FOREIGN KEY (cron_job_id) REFERENCES cron_job (id)');
        $this->addSql('DROP TABLE CronJob');
        $this->addSql('DROP TABLE CronReport');
        $this->addSql('DROP TABLE selection');
        $this->addSql('DROP TABLE slackAccount');
        $this->addSql('DROP TABLE slackTeam');
        $this->addSql('ALTER TABLE token CHANGE userId userId INT DEFAULT NULL');
        $this->addSql('ALTER TABLE fos_user DROP FOREIGN KEY FK_957A647910F3034D');
        $this->addSql('ALTER TABLE fos_user ADD notificationSubscribe TINYINT(1) DEFAULT NULL, CHANGE salt salt VARCHAR(255) DEFAULT NULL, CHANGE last_login last_login DATETIME DEFAULT NULL, CHANGE confirmation_token confirmation_token VARCHAR(180) DEFAULT NULL, CHANGE password_requested_at password_requested_at DATETIME DEFAULT NULL, CHANGE firstName firstName VARCHAR(255) DEFAULT NULL, CHANGE lastName lastName VARCHAR(255) DEFAULT NULL, CHANGE updated updated DATETIME DEFAULT NULL, CHANGE userUpdated userUpdated DATETIME DEFAULT NULL, CHANGE biographie biographie VARCHAR(5000) DEFAULT NULL, CHANGE intensity intensity INT DEFAULT NULL, CHANGE atmosphere atmosphere INT DEFAULT NULL, CHANGE latitude latitude DOUBLE PRECISION DEFAULT NULL, CHANGE longitude longitude DOUBLE PRECISION DEFAULT NULL, CHANGE imageId imageId INT DEFAULT NULL, CHANGE deleted deleted DATETIME DEFAULT NULL, CHANGE lastConnexion lastConnexion DATETIME DEFAULT NULL, CHANGE userNotified userNotified DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE fos_user ADD CONSTRAINT FK_957A647910F3034D FOREIGN KEY (imageId) REFERENCES image (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE user_tag DROP FOREIGN KEY FK_E89FD608A76ED395');
        $this->addSql('ALTER TABLE user_tag DROP FOREIGN KEY FK_E89FD608BAD26311');
        $this->addSql('ALTER TABLE user_tag ADD CONSTRAINT FK_E89FD608A76ED395 FOREIGN KEY (user_id) REFERENCES fos_user (id)');
        $this->addSql('ALTER TABLE user_tag ADD CONSTRAINT FK_E89FD608BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id)');
        $this->addSql('ALTER TABLE user_domain DROP FOREIGN KEY FK_C2FB0536115F0EE5');
        $this->addSql('ALTER TABLE user_domain DROP FOREIGN KEY FK_C2FB0536A76ED395');
        $this->addSql('ALTER TABLE user_domain ADD CONSTRAINT FK_C2FB0536115F0EE5 FOREIGN KEY (domain_id) REFERENCES domain (id)');
        $this->addSql('ALTER TABLE user_domain ADD CONSTRAINT FK_C2FB0536A76ED395 FOREIGN KEY (user_id) REFERENCES fos_user (id)');
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045F64B64DCC');
        $this->addSql('DROP INDEX UNIQ_C53D045F64B64DCC ON image');
        $this->addSql('ALTER TABLE image DROP userId, DROP secureUrl, CHANGE updated updated DATETIME DEFAULT NULL, CHANGE publicId publicId VARCHAR(255) DEFAULT NULL, CHANGE version version VARCHAR(255) DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX name_type_idx ON tag (name, type)');
        $this->addSql('ALTER TABLE message ADD deleted DATETIME DEFAULT NULL, CHANGE message message VARCHAR(255) DEFAULT NULL, CHANGE isRead isRead TINYINT(1) DEFAULT NULL, CHANGE updated updated DATETIME DEFAULT NULL, CHANGE lastReminder lastReminder DATETIME DEFAULT NULL, CHANGE senderId senderId INT DEFAULT NULL, CHANGE receiverId receiverId INT DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE cron_job_result DROP FOREIGN KEY FK_2CD346EE79099ED8');
        $this->addSql('CREATE TABLE CronJob (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(191) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`, command VARCHAR(191) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`, schedule VARCHAR(191) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`, description VARCHAR(191) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`, enabled TINYINT(1) NOT NULL, UNIQUE INDEX un_name (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE CronReport (id INT AUTO_INCREMENT NOT NULL, job_id INT DEFAULT NULL, runAt DATETIME NOT NULL, runTime DOUBLE PRECISION NOT NULL, exitCode INT NOT NULL, output LONGTEXT CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`, INDEX IDX_E8516938BE04EA9 (job_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE selection (id INT AUTO_INCREMENT NOT NULL, selected TINYINT(1) NOT NULL, updated DATETIME DEFAULT \'NULL\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE slackAccount (id INT AUTO_INCREMENT NOT NULL, accountId VARCHAR(255) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`, slackTeamId INT DEFAULT NULL, userId INT DEFAULT NULL, INDEX IDX_8B624F10356D6084 (slackTeamId), UNIQUE INDEX uniqueSlackAccount (accountId, slackTeamId), INDEX IDX_8B624F1064B64DCC (userId), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE slackTeam (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8 DEFAULT \'NULL\' COLLATE `utf8_unicode_ci`, teamId VARCHAR(255) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`, type VARCHAR(255) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`, UNIQUE INDEX uniqueSlackAccount (teamId, type), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE CronReport ADD CONSTRAINT FK_E8516938BE04EA9 FOREIGN KEY (job_id) REFERENCES CronJob (id)');
        $this->addSql('ALTER TABLE slackAccount ADD CONSTRAINT FK_8B624F10356D6084 FOREIGN KEY (slackTeamId) REFERENCES slackTeam (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE slackAccount ADD CONSTRAINT FK_8B624F1064B64DCC FOREIGN KEY (userId) REFERENCES fos_user (id) ON DELETE SET NULL');
        $this->addSql('DROP TABLE subscription');
        $this->addSql('DROP TABLE cron_job_result');
        $this->addSql('DROP TABLE cron_job');
        $this->addSql('ALTER TABLE fos_user DROP FOREIGN KEY FK_957A647910F3034D');
        $this->addSql('ALTER TABLE fos_user DROP notificationSubscribe, CHANGE salt salt VARCHAR(255) CHARACTER SET utf8 DEFAULT \'NULL\' COLLATE `utf8_unicode_ci`, CHANGE last_login last_login DATETIME DEFAULT \'NULL\', CHANGE confirmation_token confirmation_token VARCHAR(180) CHARACTER SET utf8 DEFAULT \'NULL\' COLLATE `utf8_unicode_ci`, CHANGE password_requested_at password_requested_at DATETIME DEFAULT \'NULL\', CHANGE firstName firstName VARCHAR(255) CHARACTER SET utf8 DEFAULT \'NULL\' COLLATE `utf8_unicode_ci`, CHANGE lastName lastName VARCHAR(255) CHARACTER SET utf8 DEFAULT \'NULL\' COLLATE `utf8_unicode_ci`, CHANGE updated updated DATETIME DEFAULT \'NULL\', CHANGE userUpdated userUpdated DATETIME DEFAULT \'NULL\', CHANGE userNotified userNotified DATETIME DEFAULT \'NULL\', CHANGE biographie biographie VARCHAR(5000) CHARACTER SET utf8 DEFAULT \'NULL\' COLLATE `utf8_unicode_ci`, CHANGE intensity intensity INT DEFAULT NULL, CHANGE atmosphere atmosphere INT DEFAULT NULL, CHANGE latitude latitude DOUBLE PRECISION DEFAULT \'NULL\', CHANGE longitude longitude DOUBLE PRECISION DEFAULT \'NULL\', CHANGE lastConnexion lastConnexion DATETIME DEFAULT \'NULL\', CHANGE deleted deleted DATETIME DEFAULT \'NULL\', CHANGE imageId imageId INT DEFAULT NULL');
        $this->addSql('ALTER TABLE fos_user ADD CONSTRAINT FK_957A647910F3034D FOREIGN KEY (imageId) REFERENCES image (id)');
        $this->addSql('ALTER TABLE image ADD userId INT DEFAULT NULL, ADD secureUrl VARCHAR(255) CHARACTER SET utf8 DEFAULT \'NULL\' COLLATE `utf8_unicode_ci`, CHANGE publicId publicId VARCHAR(255) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`, CHANGE version version VARCHAR(255) CHARACTER SET utf8 DEFAULT \'NULL\' COLLATE `utf8_unicode_ci`, CHANGE updated updated DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045F64B64DCC FOREIGN KEY (userId) REFERENCES fos_user (id) ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C53D045F64B64DCC ON image (userId)');
        $this->addSql('ALTER TABLE message DROP deleted, CHANGE message message VARCHAR(255) CHARACTER SET utf8 DEFAULT \'NULL\' COLLATE `utf8_unicode_ci`, CHANGE isRead isRead TINYINT(1) DEFAULT \'NULL\', CHANGE updated updated DATETIME DEFAULT \'NULL\', CHANGE lastReminder lastReminder DATETIME DEFAULT \'NULL\', CHANGE senderId senderId INT DEFAULT NULL, CHANGE receiverId receiverId INT DEFAULT NULL');
        $this->addSql('DROP INDEX name_type_idx ON tag');
        $this->addSql('ALTER TABLE token CHANGE userId userId INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_domain DROP FOREIGN KEY FK_C2FB0536A76ED395');
        $this->addSql('ALTER TABLE user_domain DROP FOREIGN KEY FK_C2FB0536115F0EE5');
        $this->addSql('ALTER TABLE user_domain ADD CONSTRAINT FK_C2FB0536A76ED395 FOREIGN KEY (user_id) REFERENCES fos_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_domain ADD CONSTRAINT FK_C2FB0536115F0EE5 FOREIGN KEY (domain_id) REFERENCES domain (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_tag DROP FOREIGN KEY FK_E89FD608A76ED395');
        $this->addSql('ALTER TABLE user_tag DROP FOREIGN KEY FK_E89FD608BAD26311');
        $this->addSql('ALTER TABLE user_tag ADD CONSTRAINT FK_E89FD608A76ED395 FOREIGN KEY (user_id) REFERENCES fos_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_tag ADD CONSTRAINT FK_E89FD608BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
    }
}
