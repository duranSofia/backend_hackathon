/*
  Warnings:

  - You are about to drop the `Company_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Company_info` DROP FOREIGN KEY `company_info_ibfk_1`;

-- CreateTable
CREATE TABLE `CompanyInfo` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `employeeId` INT NOT NULL,
UNIQUE INDEX `CompanyInfo_employeeId_unique`(`employeeId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- DropTable
DROP TABLE `Company_info`;

-- AddForeignKey
ALTER TABLE `CompanyInfo` ADD FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
