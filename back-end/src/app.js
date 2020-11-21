 import express, { json } from 'express'
 import morgan from 'morgan'

 // Impting Routes
 import userRoutes from './routes/users'


 // Initializations

 const app = express();

 //midelwares
 app.use(morgan());
 app.use(json());

 // routes
 app.use('/api/projects', userRoutes)
 
 export default app;