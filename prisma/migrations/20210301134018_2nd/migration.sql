/*
  Warnings:

  - You are about to drop the column `addres` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `address` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `addres`,
    ADD COLUMN     `address` VARCHAR(191) NOT NULL;
