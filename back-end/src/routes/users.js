//  import { Router } from 'express'
//  const router = Router()

 const express = require('express')
 const router = express.Router()
 
 import { getAllUsers, 
          login,
          logout } from '../controllers/user.controllers'
 
 router.get('/', getAllUsers)
 router.post('/', login)
 //router.get('/logout', logout)
 


 export default router