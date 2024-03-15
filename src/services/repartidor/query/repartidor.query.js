import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crearRepartidorQuery = async (licencia, trabajador, user) => {
    const result = await prisma.repartidor.create({
        data: {
            licencia:licencia,
            trabajador: {
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

const updateAdministradorQuery = async (licencia, trabajador, user, x)=>{
    const result = await prisma.repartidor.update({
        where:{idRepa: x},
        data:
        {
        licencia:licencia,
        trabajador:{
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




const listarRepartidorQuery = async()=>{
    const result = await prisma.repartidor.findMany({include:{user: true, trabajador: true}})
    return result
}

const eliminarRepartidorQuery = async (x)=>{
    const result = await prisma.repartidor.delete({where:{idRepa:x}})

    console.log(result)
    return result
}

const obtenerRepartidorQuery = async(x)=>{
    const result = await prisma.repartidor.findUnique({ where: { idRepa: x } })
    return result
}

const existeLicenciaQuery = async(licencia)=>{
    const result = await prisma.repartidor.findUnique({where:{licencia: licencia}})
    return result
}

const queryRepa = {
    crearRepartidorQuery,
    listarRepartidorQuery,
    eliminarRepartidorQuery,
    obtenerRepartidorQuery,
    updateAdministradorQuery,
    existeLicenciaQuery
}

export default queryRepa