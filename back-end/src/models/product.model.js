 import Sequelize from 'sequelize'
 import { sequelize } from '../database/database'
 const Product = sequelize.define('product', {
     id: {
         type: Sequelize.INTEGER,
         primaryKey: true
     },
     name: {
         type: Sequelize.TEXT
     },
     price: {
         type: Sequelize.NUMBER
     },
     quantity: {
         type: Sequelize.NUMBER
     }
 },{
    timestamps: false
 })

 export default Product