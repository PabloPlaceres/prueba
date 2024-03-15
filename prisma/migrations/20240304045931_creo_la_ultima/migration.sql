/*
  Warnings:

  - You are about to drop the column `cedula` on the `Administrador` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[repaId]` on the table `Trabajador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[adminID]` on the table `Trabajador` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gmail` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Trabajador` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Administrador_cedula_key";

-- AlterTable
ALTER TABLE "Administrador" DROP COLUMN "cedula";

-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "foto" TEXT,
ADD COLUMN     "gmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trabajador" ADD COLUMN     "adminID" INTEGER,
ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "foto" TEXT,
ADD COLUMN     "repaId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Trabajador_repaId_key" ON "Trabajador"("repaId");

-- CreateIndex
CREATE UNIQUE INDEX "Trabajador_adminID_key" ON "Trabajador"("adminID");

-- AddForeignKey
ALTER TABLE "Trabajador" ADD CONSTRAINT "Trabajador_repaId_fkey" FOREIGN KEY ("repaId") REFERENCES "Repartidor"("idRepa") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trabajador" ADD CONSTRAINT "Trabajador_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "Administrador"("idAdmi") ON DELETE SET NULL ON UPDATE CASCADE;
