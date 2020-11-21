 import Sequelize from 'sequelize'
 import { sequelize } from '../database/database'
 
 const User = sequelize.define('user', {
     id: {
         type: Sequelize.INTEGER,
         primaryKey: true
     },
     name: {
         type: Sequelize.TEXT
     },
     email: {
         type: Sequelize.TEXT
     },
     password: {
         type: Sequelize.TEXT
     }
 },{
    timestamps: false
 })
 export default User