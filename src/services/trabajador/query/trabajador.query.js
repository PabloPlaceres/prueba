
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const trabajadorExistente =async (ci) =>{
    const result = await prisma.trabajador.findFirst({ where: { ci: ci } });
    return result
}

const eliminarTrabajadorAdministradorQuery = async (x)=>{
    const result = await prisma.trabajador.delete({where:{adminID: x}})
    return result
}

const eliminarTrabajadorRepartidorQuery = async (x)=>{
    const result = await prisma.trabajador.delete({where:{repaId: x}})
    return result
}

const deleteTrabajadorQuery = async (cip)=>{
    const result = await prisma.trabajador.delete({where:{ci: cip}})
    return result
}

const listarTrabajadorQuery = async()=>{
    const result = await prisma.trabajador.findMany()
    return result
}

const CrearTrabajadorQuery = async (trabajador) =>{
    const result = await prisma.trabajador.create({data:{
        nombre: trabajador.nombre,
        ci:trabajador.ci,
        apellido: trabajador.apellido,
        telefono: trabajador.telefono,
        foto: trabajador.foto,
        descripcion: trabajador.descripcion,
        sexo: trabajador.sexo}})
    return result
}

const actualizarTrabajadorQuery = async (trabajador,cip)=>{
    const result = await prisma.trabajador.update({where:{ci: cip},data:{nombre: trabajador.nombre,
        apellido: trabajador.apellido,
        telefono: trabajador.telefono,
        foto: trabajador.foto,
        descripcion: trabajador.descripcion,
        sexo: trabajador.sexo}})
    return result
}


const trabajadorQuery = {
    trabajadorExistente,
    eliminarTrabajadorAdministradorQuery,
    eliminarTrabajadorRepartidorQuery,
    deleteTrabajadorQuery,
    listarTrabajadorQuery,
    CrearTrabajadorQuery,
    actualizarTrabajadorQuery
}

export default trabajadorQuery