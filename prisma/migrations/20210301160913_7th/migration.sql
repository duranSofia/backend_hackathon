/*
  Warnings:

  - You are about to drop the column `further_educatio` on the `Wish` table. All the data in the column will be lost.
  - Added the required column `further_education` to the `Wish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Wish` DROP COLUMN `further_educatio`,
    ADD COLUMN     `further_education` VARCHAR(191) NOT NULL;
