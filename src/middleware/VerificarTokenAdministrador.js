import { request, response } from "express";
import JWT from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const verifiTokenAdministrador = async(req = request, res = response, next)=>{

    const token = req.header('x-Token')
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const {id, rol} = JWT.verify(token, process.env.SECRETORPRIVATEKEY)
            if (rol !== 'Admin') {
                res.status(401).json({
                    msg: 'Acceso solo a Administrador'
            })
        }

                const users = await prisma.administrador.findUnique({where: {idAdmi:id}})
                req.users = users  
                    if(!users){return res.status(401).json({msg: 'No existes en db'}) }
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

export default verifiTokenAdministrador