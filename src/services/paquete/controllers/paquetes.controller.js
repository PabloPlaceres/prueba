import { PrismaClient } from "@prisma/client";
import { request, response } from "express";
import paqueteQuery from "../query/paquete.query.js";
import clienteQuery from "../../cliente/query/cliente.query.js";


const prisma = new PrismaClient()

export const crearPaqueAdmin = async (req = request, res = response)=>{
    try {
        const {direccionA, direccionB, nombre, peso, idCliente } = req.body
        const  clienteId = parseInt(idCliente)

        const direccionUnidaA = unirDireccion(direccionA)
        const direccionUnidaB = unirDireccion(direccionB)

         console.log(clienteId, idCliente, peso)
        const clienteExists = await clienteQuery.obtenerClienteQuery(clienteId)
        if (!clienteExists) {
            return res.status(404).json({ error: 'Cliente not found' });
        }
        
        const entero = parseFloat(peso)
        if (!peso || isNaN(entero)) {
            return res.status(400).json({ error: 'El peso es requerido y debe ser un número.' });}
    
        const result = await paqueteQuery.crearPaqueteQuery({direccionUnidaA, direccionUnidaB, nombre, peso} ,idCliente)
        return res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    }

export const listarPaquetes =async (req= request, res= response )=>{
    try {
        const result = await paqueteQuery.listarPaqueteQuery()
        return res.status(200).json({result}) 
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const eliminarPaquete = async(req = request, res = response)=>{
    try {
        const id = req.params.id
        const x = parseInt(id)

        const paqueteExist = await paqueteQuery.obtenerPaqueteQuery(x)
        if(!paqueteExist){return res.status(400).json({error: 'Paquete not found'})}

        const result = await paqueteQuery.deletePaqueteQuery(x)
        return res.status(200).json({result})

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const updatePaque = async (req = request, res = response)=>{
    try {
        const {direccionA, direccionB, peso, nombre}= req.body
        const id = req.params.id
        const x = parseInt(id)

        const direccionUnidaA = unirDireccion(direccionA)
        const direccionUnidaB = unirDireccion(direccionB)

        const paqueteExist = await paqueteQuery.obtenerPaqueteQuery(x)
        if(!paqueteExist){return res.status(400).json({error: 'Paquete not found'})}
        
        const resut = await paqueteQuery.actualizarPaqueteQuery({direccionUnidaA, direccionUnidaB, peso, nombre}, x)
        return res.status(200).json({resut})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

