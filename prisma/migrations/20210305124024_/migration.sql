/*
  Warnings:

  - You are about to drop the column `software` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `professional` on the `Skill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Skill` DROP COLUMN `software`,
    DROP COLUMN `languages`,
    DROP COLUMN `professional`,
    ADD COLUMN     `skillTypeId` INT;

-- CreateTable
CREATE TABLE `SkillType` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Skill` ADD FOREIGN KEY (`skillTypeId`) REFERENCES `SkillType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
