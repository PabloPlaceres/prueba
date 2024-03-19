import { PrismaClient } from "@prisma/client";
import { request, response } from "express";
import usuarioQuery from "../query/usuario.query.js"

const prisma = new PrismaClient()

export const listarUsers = async (req= request, res= response)=>{
    try {
        const resutl = await usuarioQuery.listarUsuarioQuery()
        res.status(200).json({resutl})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

export const seedUsers = async (req, res)=>{
    try {
        const users = await usuarioQuery.listarUsuarioQuery()

        if(users?.length === 0){

            const salt = bcryptjs.genSaltSync()
            const password = bcryptjs.hashSync('Admin1234', salt)
            await usuarioQuery.createUser({ data: {
                traba: {
                    create: {
                        ci: '01101264403', 
                        nombre: 'Pablo',
                        apellido: 'Placeres',
                        telefono: '55713569',
                        foto: "",
                        descripcion: 'Esto es ua descripcion',
                        sexo: 'M'
                    }
                },
                user: {
                    create: {
                        usuario: 'Admin',
                        password: password,
                    }
                }
            }})
        }

    } catch (error) {
        
    }
}