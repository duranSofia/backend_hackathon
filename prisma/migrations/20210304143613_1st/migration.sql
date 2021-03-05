/*
  Warnings:

  - You are about to drop the column `softskill` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SkillType` table. All the data in the column will be lost.
  - Added the required column `softskill` to the `Other` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Other` ADD COLUMN     `softskill` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Skill` DROP COLUMN `softskill`,
    ADD COLUMN     `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SkillType` DROP COLUMN `name`;
