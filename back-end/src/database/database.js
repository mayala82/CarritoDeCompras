 import Sequelize from 'sequelize'
 
 export const sequelize = new Sequelize(
     'online_store', 
     'root', 
     '', 
     { 
         host: 'localhost',
         dialect: 'mysql',
     pool: {
         max: 5,
         min: 0,
         idle: 10000
     },
  });