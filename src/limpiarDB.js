import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


const eliminarTodo = async ()=>{
   await prisma.administrador.deleteMany()
   await prisma.usuario.deleteMany()
   await prisma.trabajador.deleteMany()
   await prisma.paquete.deleteMany()
   await prisma.repartidor.deleteMany()
   await prisma.cliente.deleteMany() 
}