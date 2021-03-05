/*
  Warnings:

  - You are about to drop the column `wishId` on the `Skill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `employee_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Skill` DROP FOREIGN KEY `skill_ibfk_1`;

-- AlterTable
ALTER TABLE `Skill` DROP COLUMN `wishId`;

-- CreateTable
CREATE TABLE `_EmployeeToSkill` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_EmployeeToSkill_AB_unique`(`A`, `B`),
INDEX `_EmployeeToSkill_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SkillToWish` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_SkillToWish_AB_unique`(`A`, `B`),
INDEX `_SkillToWish_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EmployeeToSkill` ADD FOREIGN KEY (`A`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToSkill` ADD FOREIGN KEY (`B`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SkillToWish` ADD FOREIGN KEY (`A`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SkillToWish` ADD FOREIGN KEY (`B`) REFERENCES `Wish`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
