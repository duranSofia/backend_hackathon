/*
  Warnings:

  - You are about to drop the column `experienceId` on the `Industry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Industry` DROP FOREIGN KEY `industry_ibfk_1`;

-- AlterTable
ALTER TABLE `Industry` DROP COLUMN `experienceId`;

-- CreateTable
CREATE TABLE `_network` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_network_AB_unique`(`A`, `B`),
INDEX `_network_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_network` ADD FOREIGN KEY (`A`) REFERENCES `Experience`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_network` ADD FOREIGN KEY (`B`) REFERENCES `Industry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
