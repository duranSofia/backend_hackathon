/*
  Warnings:

  - You are about to drop the column `company_info_id` on the `Employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_ibfk_1`;

-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `company_info_id`;

-- CreateTable
CREATE TABLE `_Company_infoToEmployee` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_Company_infoToEmployee_AB_unique`(`A`, `B`),
INDEX `_Company_infoToEmployee_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Company_infoToEmployee` ADD FOREIGN KEY (`A`) REFERENCES `Company_info`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Company_infoToEmployee` ADD FOREIGN KEY (`B`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
