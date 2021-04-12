/*
  Warnings:

  - You are about to drop the column `client` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `clients` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Experience` DROP COLUMN `client`,
    ADD COLUMN     `clients` VARCHAR(191) NOT NULL;
