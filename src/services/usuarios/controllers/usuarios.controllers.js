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