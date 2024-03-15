/*
  Warnings:

  - You are about to drop the column `password` on the `Administrador` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `Administrador` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Repartidor` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `Repartidor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Administrador_password_key";

-- DropIndex
DROP INDEX "Administrador_usuario_key";

-- DropIndex
DROP INDEX "Cliente_usuario_key";

-- DropIndex
DROP INDEX "Repartidor_password_key";

-- DropIndex
DROP INDEX "Repartidor_usuario_key";

-- AlterTable
ALTER TABLE "Administrador" DROP COLUMN "password",
DROP COLUMN "usuario";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "password",
DROP COLUMN "usuario";

-- AlterTable
ALTER TABLE "Repartidor" DROP COLUMN "password",
DROP COLUMN "usuario";

-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "clienteID" INTEGER,
    "repaId" INTEGER,
    "adminID" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_clienteID_key" ON "Usuario"("clienteID");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_repaId_key" ON "Usuario"("repaId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_adminID_key" ON "Usuario"("adminID");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_clienteID_fkey" FOREIGN KEY ("clienteID") REFERENCES "Cliente"("idCliente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_repaId_fkey" FOREIGN KEY ("repaId") REFERENCES "Repartidor"("idRepa") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "Administrador"("idAdmi") ON DELETE SET NULL ON UPDATE CASCADE;
