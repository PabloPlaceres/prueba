/*
  Warnings:

  - Added the required column `clienID` to the `Paquete` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Administrador_telefono_key";

-- DropIndex
DROP INDEX "Cliente_password_key";

-- DropIndex
DROP INDEX "Cliente_telefono_key";

-- DropIndex
DROP INDEX "Paquete_repaID_key";

-- DropIndex
DROP INDEX "Repartidor_telefono_key";

-- AlterTable
ALTER TABLE "Paquete" ADD COLUMN     "clienID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_clienID_fkey" FOREIGN KEY ("clienID") REFERENCES "Cliente"("idCliente") ON DELETE RESTRICT ON UPDATE CASCADE;
