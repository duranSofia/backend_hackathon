/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[employeeId]` on the table `ContactInfo`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ContactInfo_employeeId_unique` ON `ContactInfo`(`employeeId`);
