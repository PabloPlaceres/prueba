import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearAdministradorQuery = async (trabajador, user) => {
    const result = await prisma.administrador.create({
        data: {
            traba: {
                create: {
                    ci: trabajador.ci, 
                    nombre: trabajador.nombre,
                    apellido: trabajador.apellido,
                    telefono: trabajador.telefono,
                    foto: trabajador.foto,
                    descripcion: trabajador.descripcion,
                    sexo: trabajador.sexo
                }
            },
            user: {
                create: {
                    usuario: user.usuario,
                    password: user.password,
                }
            }
        }
    });
    return result;
}

const updateAdministradorQuery = async (trabajador, user, x)=>{
    const result = await prisma.administrador.update({
        where:{idAdmi: x},
        data:
        {   
        traba:{
            update:{
                    ci: trabajador.ci,
                    nombre: trabajador.nombre,
                    apellido: trabajador.apellido,
                    telefono: trabajador.telefono,
                    foto: trabajador.foto,
                    descripcion: trabajador.descripcion,
                    sexo: trabajador.sexo
                }
            },
            user:{
                update:{
                usuario: user.usuario,
                password: user.password
            }}
        }
        
        }
    )
    return result
}




const listarAdministradorQuery = async()=>{
    const result = await prisma.administrador.findMany({include:{user: true, traba: true}})
    return result
}

const eliminarAdministradorQuery = async (x)=>{
    const result = await prisma.administrador.delete({where:{idAdmi:x}})

    console.log(result)
    return result
}

const obtenerAdministradorQuery = async(x)=>{
    const result = await prisma.administrador.findUnique({ where: { idAdmi: x } })
    return result
}

const invetarioQuery = async()=>{
    const result = await prisma.paquete.findMany({where:{entregado:true}})
    return result
}

const queryAdmin = {
    crearAdministradorQuery,
    updateAdministradorQuery,
    listarAdministradorQuery,
    eliminarAdministradorQuery,
    obtenerAdministradorQuery,
    invetarioQuery
}

export default queryAdmin