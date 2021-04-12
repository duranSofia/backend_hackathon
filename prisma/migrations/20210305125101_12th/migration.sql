/*
  Warnings:

  - You are about to drop the column `skillId` on the `Employee` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `skillId` ON `Employee`;

-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `skillId`;
