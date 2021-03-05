/*
  Warnings:

  - You are about to drop the column `network` on the `Experience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Employee` MODIFY `picture` VARCHAR(191);

-- AlterTable
ALTER TABLE `Experience` DROP COLUMN `network`;

-- AlterTable
ALTER TABLE `Industry` ADD COLUMN     `experienceId` INT;

-- AlterTable
ALTER TABLE `Intrests` MODIFY `hobbies` VARCHAR(191),
    MODIFY `special_skills` VARCHAR(191);

-- AlterTable
ALTER TABLE `Wish` MODIFY `further_education` VARCHAR(191);

-- AddForeignKey
ALTER TABLE `Industry` ADD FOREIGN KEY (`experienceId`) REFERENCES `Experience`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
