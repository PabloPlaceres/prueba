import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearClienteQuery = async(client)=>{
    const result = await prisma.cliente.create({data:{
        nombre:client.nombre,
        apellido:client.apellido,
        telefono:client.telefono,
        foto:client.foto,
        direccion: client.direccionUnida,
        gmail: client.gmail
    }})
    return result
}

const actualizarClienteQuery = async (client, x)=>{
    const result = await prisma.cliente.update({where:{idCliente: x},
    data:{
        nombre:client.nombre,
        apellido:client.apellido,
        telefono:client.telefono,
        foto:client.foto,
        direccion: client.direccionUnida,
        gmail: client.gmail
    }})
    return result
}

const obtenerClienteQuery = async (x)=>{
    const result = await prisma.cliente.findUnique({ where: { idCliente: x } });
    return result
}

const listarClienteQuery = async ()=>{
    const result = await prisma.cliente.findMany()
    return result
}

const eliminarClienteQuery = async (x)=>{
    const result = await prisma.cliente.delete({where:{idCliente: x}})
    return result
}

const clienteQuery = {
    crearClienteQuery,
    actualizarClienteQuery,
    obtenerClienteQuery,
    listarClienteQuery,
    eliminarClienteQuery
}

export default clienteQuery