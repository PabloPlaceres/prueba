import { request, response } from "express";
import JWT from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


const verificarTokenComun = async (req= request, res= response, next)=>{
    const token = req.header('x-Token')
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const {id, rol} = JWT.verify(token, process.env.SECRETORPRIVATEKEY)
        console.log(rol)
            if (!rol === 'Admin'||!rol === 'Repa') {
                res.status(401).json({
                    msg: 'No tiene acceso'
            })
        }
            if('Admin'){
                const users = await prisma.administrador.findUnique({where: {idAdmi:id}})
                req.users = users  
            }else {
                const users = await prisma.repartidor.findUnique({where: {idRepa:id}})
                req.users = users 
                if (!users) {
                return res.status(401).json({msg: 'No existes en db'}) }  
            }
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
}


export default verificarTokenComun