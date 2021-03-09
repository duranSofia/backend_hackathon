/*
  Warnings:

  - You are about to drop the `_SkillToWish` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `project` to the `Wish` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_SkillToWish` DROP FOREIGN KEY `_skilltowish_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_SkillToWish` DROP FOREIGN KEY `_skilltowish_ibfk_2`;

-- AlterTable
ALTER TABLE `Wish` ADD COLUMN     `project` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_SkillToWish`;
