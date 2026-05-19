import express from 'express';
import app from '../server.js';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs/promises';
import jwt from 'jsonwebtoken';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filepath = path.join(__dirname, '../', 'data', 'userData.json');


const register = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        email: email,
        password: hashedPassword
    };
    try {
        const usersData = await fs.readFile(filepath, 'utf-8');
        const users = JSON.parse(usersData);
        users.push(user)

        await fs.writeFile(filepath, JSON.stringify(users, null, 2));
        console.log('user created')
        res.status(200).json({
            message:'response ok'
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message:'error'
        })
    }



}

const login=async(req,res)=>{
const {email,password} =req.body;
    try{
        const userData=await fs.readFile(filepath,'utf-8');
        const data=JSON.parse(userData);

//1.verifing the email and password
const user = data.find((i) => i.email === email);
if(!user){
res.status(404).json({
    message:'user is not exist'
})
}
else{
  const isMatch=await bcrypt.compare(password,user.password);
  if(isMatch){


    // 2.creating jwt token
   const token= jwt.sign({
    id:Date.now(),
    email:user.email
   },
'give any secrte password',);
console.log(token);

//3.sending token to browser
res.cookie('token',token);
res.status(200).json({
    message:'Login successfully'
})


  }else{
    res.status(401).json({
        message:'Incorrect password'
    })
  }

}
}catch(error){
        res.status(500).json({
            message:'server error'
        })
    }
}


export {register,login};

