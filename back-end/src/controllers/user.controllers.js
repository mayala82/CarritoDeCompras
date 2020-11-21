 import User from '../models/users.models'
 const express = require('express')
 const router = express.Router()
 const jwt = require('jsonwebtoken');

 
 //----------------------------------------------------------------- 
 export async function getAllUsers(req, res){
     try {
         
         const users = await User.findAll({
             attributes: ['id', 'name', 'email'],
             order: [
                 ['id', 'DESC']
             ]
         })
         if (users){
             res.json({users})
             console.log({users});                         
         }else{
             res.json({
                 message: 'No hay usuarios registrados...'
             })

         }         
     } catch (error) {
         console.log('Se presentó el siguiente error al listar usuarios:...', error);         
     }
 }
 //-----------------------------------------------------------------
 export async function login(req, res) {
    const JWT_Secret = 'myMasterKey*'    
     try {
         const user = await User.findOne({
             where: {
                 email: req.body.email, 
                 password: req.body.password
             },
             attributes: [ 'id', 'name', 'email']
         })
         if (user){ 
             req.session.currentUser = user
             const payload = {
                 check:  true
             };
             const token = jwt.sign(payload, JWT_Secret, {
                 expiresIn: 1440
              });
             res.json({
                     user:user.email,
                     token: token,
                     currentUser: req.session.currentUser
                 })
         }else{
             res.json({
                 message: 'Usuario no existe...'
             })
         }                  
     } catch (error) {
         console.log('Se presentó el siguiente error durante la autenticación:...', error);
     }
 }
 //-----------------------------------------------------------------
 export async function logout(req, res){
     req.session.destroy();
     console.log('Sesión finalizada...');
     //req.redirect("/")     
 }