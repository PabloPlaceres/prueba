import { PrismaClient } from "@prisma/client";
import { request, response } from "express";
import clienteQuery from "../query/cliente.query.js";
import  paqueteQuery from "../../paquete/query/paquete.query.js"
import unirDireccion from "../../../helpers/direccion.js";

const prisma = new PrismaClient()

export const crearCliente = async (req = request, res = response)=>{
try {
    const {telefono, nombre, apellido, direccion, foto, gmail} = req.body
    const direccionUnida = unirDireccion(direccion)
    
        const result = await clienteQuery.crearClienteQuery({telefono, nombre, apellido, direccionUnida, foto, gmail} )
        return res.status(200).json({result})  
} catch (error) {
    console.log(error)
    return res.status(500).json(error)
}
}

export const updateClienteDatos = async(req= request, res=response)=>{
    try {
        const id = req.params.id
        const x = parseInt(id)
        const {telefono, nombre, apellido, direccion, foto, gmail} = req.body
        
        const direccionUnida = unirDireccion(direccion)
        
        const clienteExists = await clienteQuery.obtenerClienteQuery(x)
        if (!clienteExists) {
            return res.status(404).json({ error: 'Cliente not found' });
        }
        
        const result = clienteQuery.actualizarClienteQuery({telefono, nombre, apellido, direccionUnida, foto, gmail}, x)
        return res.status(200).json({result})   
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}


export const listarCliente =async(req= request, res=response)=>{
    try {
        const result = await clienteQuery.listarClienteQuery()
        return res.status(200).json({result})  
    } catch (error) {
    console.log(error)
    return res.status(500).json(error)
    }
}

export const eliminarCliente = async(req= request, res=response)=>{
    try {
        const id = req.params.id
        const x = parseInt(id)

        const clienteExists = await clienteQuery.obtenerClienteQuery(x)
        if (!clienteExists) {
            return res.status(404).json({ error: 'Cliente not found' });
        }

        
        await paqueteQuery.eliminarPaquetesClienteId(x)
        
        const result = await clienteQuery.eliminarClienteQuery(x)
        return res.status(200).json({result})  
    } catch (error) {
    console.log(error)
    return res.status(500).json(error)
    }
}

