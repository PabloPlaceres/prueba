import { request, response } from "express";
import generateToken from "../../../helpers/jwt.js";
import bcryptjs from "bcryptjs"
import loginQuery from "../query/login.query.js"




export const login = async(req = request, res = response)=>{
    const {usuario, password} = req.body
    try {
        const user = await loginQuery(usuario)
        if(!user){res.status(400).json({msg: 'Usuario o passworde no son correctos***'})}
        

        const verifiPassword = bcryptjs.compareSync(password, user.password)
        if (!verifiPassword) {return res.status(400).json({msg: 'Usuario o passworde no son correctos xxx'})}
        
        let role = '';
        let userId = null;
    
        if (user.repaId) {
            role = 'Repa';
            userId = user.repaId;
        } else if (user.adminID) {
            role = 'Admin';
            userId = user.adminID;
        }
    
        if (role && userId) {
            const token = generateToken(userId, role);
            return res.status(200).json({ user, token });
        } else {
            return res.status(400).json({ message: 'User role not recognized' });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Habla con backend'
        })
    }
}

