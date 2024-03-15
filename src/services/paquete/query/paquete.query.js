import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


const crearPaqueteQuery = async (paquete, id)=>{
    const result = await prisma.paquete.create({data:{
    direccionA: paquete.direccionUnidaA,
    direccionB: paquete.direccionUnidaB,
    peso: paquete.peso,
    nombre: paquete.nombre,
    client:{
        connect:{
            idCliente: id
        }
    }
}})
    return result
}

const obtenerPaqueteQuery = async (x)=>{
    const result = prisma.paquete.findFirst({where:{idPaq: x}})
    return result
}

const actualizarPaqueteQuery = async (paquete, x)=>{
    const result = await prisma.paquete.update({
        where:{idPaq: x},
        data:{
            direccionB: paquete.direccionUnidaB,
            peso: paquete.peso,
            nombre: paquete.nombre,
            direccionA: paquete.direccionUnidaA
        }
    })
    return result
}

const deletePaqueteQuery = async (x) =>{
    const result = await prisma.paquete.delete({where:{idPaq: x}})
    return result
}

const listarPaqueteQuery = async()=>{
    const result = await prisma.paquete.findMany({where:{estado: true}})
    return result
}

const entregarPaqueteQuery = async (x, z)=>{
    const result = await prisma.paquete.update({
        where:{idPaq: x},
        data:{
            entregado: true,
            repa:{
                disconnect:
                {idRepa:z}}
        }
    })
    return result
}

const ponerPaqueteComboReparitidorQuery = async (x, z)=>{
    const result = await prisma.paquete.update({
        where:{idPaq: x},
        data:{
            estado: false,
            repa:{
                connect:
                {idRepa:z}}
        }
    })
    return result
}

const eliminarPaquetesClienteId = async (x)=>{
    const result = await prisma.paquete.deleteMany({where:{clienID: x}})
    return result
}

const paqueteQuery = {
    eliminarPaquetesClienteId,
    crearPaqueteQuery,
    actualizarPaqueteQuery,
    ponerPaqueteComboReparitidorQuery,
    listarPaqueteQuery,
    entregarPaqueteQuery,
    deletePaqueteQuery,
    obtenerPaqueteQuery
}


export default paqueteQuery