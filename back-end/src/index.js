 const express = require ( 'express' )
 const cors = require ( 'cors' )
 const bodyParser = require ( 'body-parser' )
 const cookieParser = require ('cookie-parser')
 const session = require( 'express-session' )
 
 import userRouter from './routes/users'
 import productRouter from './routes/products'
 import cartRouter from './routes/cart'

 const port = process.env.PORT || 8080
 
 const app = express ()
 app.use(cors())
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(cookieParser());
 app.use(session(
     { 
         secret: 'mySesion', 
         resave: true, 
         saveUninitialized: true 
     }))
 app.use('/api/users', userRouter)
 app.use('/api/products', productRouter)         
 app.use('/api/cart', cartRouter)
 app.listen(port, () => {
     console.log(`Express server listening on port ${port}`);
 })
