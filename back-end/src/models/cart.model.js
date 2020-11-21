 import Sequelize from 'sequelize'
 import { sequelize } from '../database/database'

 const Sales = sequelize.define('sales', {
     id: {
         type: Sequelize.INTEGER,
         primaryKey: true
     },
     fk_id_user: {
         type: Sequelize.INTEGER
     },
     fk_id_product: {
        type: Sequelize.INTEGER
     },
     quantity: {
         type: Sequelize.INTEGER
     },
     price: {
         type: Sequelize.DECIMAL
     },
     sold: {
         type: Sequelize.BOOLEAN
     }
 },{
     timestamps: false
 })

 export default Sales