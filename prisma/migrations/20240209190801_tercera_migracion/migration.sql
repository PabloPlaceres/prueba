-- DropForeignKey
ALTER TABLE "Paquete" DROP CONSTRAINT "Paquete_clienID_fkey";

-- DropForeignKey
ALTER TABLE "Paquete" DROP CONSTRAINT "Paquete_repaID_fkey";

-- AlterTable
ALTER TABLE "Paquete" ALTER COLUMN "repaID" DROP NOT NULL,
ALTER COLUMN "clienID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_repaID_fkey" FOREIGN KEY ("repaID") REFERENCES "Repartidor"("idRepa") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_clienID_fkey" FOREIGN KEY ("clienID") REFERENCES "Cliente"("idCliente") ON DELETE SET NULL ON UPDATE CASCADE;
