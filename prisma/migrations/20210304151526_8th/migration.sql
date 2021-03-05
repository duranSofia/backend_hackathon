/*
  Warnings:

  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `clients` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `skillTypeId` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `project` on the `Wish` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `Wish` table. All the data in the column will be lost.
  - You are about to drop the `_Company_infoToEmployee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EmployeeToExperience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EmployeeToOther` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EmployeeToSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EmployeeToWish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Other` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SkillType` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[employeeId]` on the table `Company_info`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[employeeId]` on the table `Experience`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[employeeId]` on the table `Wish`. If there are existing duplicate values, the migration will fail.
  - Added the required column `employeeId` to the `Company_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `software` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languages` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professional` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `Wish` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_Company_infoToEmployee` DROP FOREIGN KEY `_company_infotoemployee_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_Company_infoToEmployee` DROP FOREIGN KEY `_company_infotoemployee_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_EmployeeToExperience` DROP FOREIGN KEY `_employeetoexperience_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_EmployeeToExperience` DROP FOREIGN KEY `_employeetoexperience_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_EmployeeToOther` DROP FOREIGN KEY `_employeetoother_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_EmployeeToOther` DROP FOREIGN KEY `_employeetoother_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_EmployeeToSkill` DROP FOREIGN KEY `_employeetoskill_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_EmployeeToSkill` DROP FOREIGN KEY `_employeetoskill_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_EmployeeToWish` DROP FOREIGN KEY `_employeetowish_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_EmployeeToWish` DROP FOREIGN KEY `_employeetowish_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Skill` DROP FOREIGN KEY `skill_ibfk_1`;

-- AlterTable
ALTER TABLE `Company_info` ADD COLUMN     `employeeId` INT NOT NULL;

-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `email`,
    DROP COLUMN `phone`,
    DROP COLUMN `address`,
    ADD COLUMN     `skillId` INT;

-- AlterTable
ALTER TABLE `Experience` DROP COLUMN `industry`,
    DROP COLUMN `clients`,
    ADD COLUMN     `employeeId` INT NOT NULL;

-- AlterTable
ALTER TABLE `Skill` DROP COLUMN `skillTypeId`,
    ADD COLUMN     `software` VARCHAR(191) NOT NULL,
    ADD COLUMN     `languages` VARCHAR(191) NOT NULL,
    ADD COLUMN     `professional` VARCHAR(191) NOT NULL,
    ADD COLUMN     `wishId` INT;

-- AlterTable
ALTER TABLE `Wish` DROP COLUMN `project`,
    DROP COLUMN `industry`,
    ADD COLUMN     `employeeId` INT NOT NULL;

-- CreateTable
CREATE TABLE `ContactInfo` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `employeeId` INT NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clients` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Industry` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Intrests` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `hobbies` VARCHAR(191) NOT NULL,
    `special_skills` VARCHAR(191) NOT NULL,
    `employeeId` INT NOT NULL,
UNIQUE INDEX `Intrests_employeeId_unique`(`employeeId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ExperienceToIndustry` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_ExperienceToIndustry_AB_unique`(`A`, `B`),
INDEX `_ExperienceToIndustry_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClientsToExperience` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_ClientsToExperience_AB_unique`(`A`, `B`),
INDEX `_ClientsToExperience_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClientsToWish` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_ClientsToWish_AB_unique`(`A`, `B`),
INDEX `_ClientsToWish_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_IndustryToWish` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_IndustryToWish_AB_unique`(`A`, `B`),
INDEX `_IndustryToWish_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- DropTable
DROP TABLE `_Company_infoToEmployee`;

-- DropTable
DROP TABLE `_EmployeeToExperience`;

-- DropTable
DROP TABLE `_EmployeeToOther`;

-- DropTable
DROP TABLE `_EmployeeToSkill`;

-- DropTable
DROP TABLE `_EmployeeToWish`;

-- DropTable
DROP TABLE `Other`;

-- DropTable
DROP TABLE `SkillType`;

-- CreateIndex
CREATE UNIQUE INDEX `Company_info_employeeId_unique` ON `Company_info`(`employeeId`);

-- CreateIndex
CREATE UNIQUE INDEX `Experience_employeeId_unique` ON `Experience`(`employeeId`);

-- CreateIndex
CREATE UNIQUE INDEX `Wish_employeeId_unique` ON `Wish`(`employeeId`);

-- AddForeignKey
ALTER TABLE `ContactInfo` ADD FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intrests` ADD FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExperienceToIndustry` ADD FOREIGN KEY (`A`) REFERENCES `Experience`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExperienceToIndustry` ADD FOREIGN KEY (`B`) REFERENCES `Industry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientsToExperience` ADD FOREIGN KEY (`A`) REFERENCES `Clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientsToExperience` ADD FOREIGN KEY (`B`) REFERENCES `Experience`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientsToWish` ADD FOREIGN KEY (`A`) REFERENCES `Clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientsToWish` ADD FOREIGN KEY (`B`) REFERENCES `Wish`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IndustryToWish` ADD FOREIGN KEY (`A`) REFERENCES `Industry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IndustryToWish` ADD FOREIGN KEY (`B`) REFERENCES `Wish`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company_info` ADD FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skill` ADD FOREIGN KEY (`wishId`) REFERENCES `Wish`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wish` ADD FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
