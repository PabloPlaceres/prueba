
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const usuarioExistente =async (usuario) =>{
    const result = await prisma.usuario.findFirst({ where: { usuario: usuario } });
    return result
}

const eliminarUsuarioAdministradorQuery = async (x)=>{
    const result = await prisma.usuario.delete({where:{adminID: x}})
    return result
}

const eliminarUsuarioRepartidorQuery = async (x)=>{
    const result = await prisma.usuario.delete({where:{repaId: x}})
    return result
}

const listarUsuarioQuery = async ()=>{
    const result = await prisma.usuario.findMany()
    return result
}

const createUser = async (user)=>{
    const result = await prisma.usuario.create(user);

    return result
}

const usuarioQuery = {
    usuarioExistente,
    eliminarUsuarioAdministradorQuery,
    eliminarUsuarioRepartidorQuery,
    listarUsuarioQuery,
    createUser
}

export default usuarioQuery