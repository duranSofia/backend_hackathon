-- CreateTable
CREATE TABLE `Employee` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `addres` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `company_info_id` INT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Experience` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `client` VARCHAR(191) NOT NULL,
    `industry` VARCHAR(191) NOT NULL,
    `network` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `software` VARCHAR(191) NOT NULL,
    `languages` VARCHAR(191) NOT NULL,
    `professional` VARCHAR(191) NOT NULL,
    `softskill` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wish` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `project` VARCHAR(191) NOT NULL,
    `industry` VARCHAR(191) NOT NULL,
    `further_educatio` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Education` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `degree` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Other` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `hobbies` VARCHAR(191) NOT NULL,
    `special_skills` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company_info` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,
    `departmet` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployeeToExperience` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_EmployeeToExperience_AB_unique`(`A`, `B`),
INDEX `_EmployeeToExperience_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployeeToSkill` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_EmployeeToSkill_AB_unique`(`A`, `B`),
INDEX `_EmployeeToSkill_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployeeToWish` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_EmployeeToWish_AB_unique`(`A`, `B`),
INDEX `_EmployeeToWish_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EducationToEmployee` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_EducationToEmployee_AB_unique`(`A`, `B`),
INDEX `_EducationToEmployee_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployeeToOther` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_EmployeeToOther_AB_unique`(`A`, `B`),
INDEX `_EmployeeToOther_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD FOREIGN KEY (`company_info_id`) REFERENCES `Company_info`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToExperience` ADD FOREIGN KEY (`A`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToExperience` ADD FOREIGN KEY (`B`) REFERENCES `Experience`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToSkill` ADD FOREIGN KEY (`A`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToSkill` ADD FOREIGN KEY (`B`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToWish` ADD FOREIGN KEY (`A`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToWish` ADD FOREIGN KEY (`B`) REFERENCES `Wish`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EducationToEmployee` ADD FOREIGN KEY (`A`) REFERENCES `Education`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EducationToEmployee` ADD FOREIGN KEY (`B`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToOther` ADD FOREIGN KEY (`A`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToOther` ADD FOREIGN KEY (`B`) REFERENCES `Other`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
