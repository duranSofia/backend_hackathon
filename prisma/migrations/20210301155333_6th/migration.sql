/*
  Warnings:

  - You are about to drop the column `departmet` on the `Company_info` table. All the data in the column will be lost.
  - Added the required column `department` to the `Company_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company_info` DROP COLUMN `departmet`,
    ADD COLUMN     `department` VARCHAR(191) NOT NULL;
