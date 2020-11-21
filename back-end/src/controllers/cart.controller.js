import { sequelize } from '../database/database'
 //https://sequelize.org/master/manual/raw-queries.html 
 
 import Sales from '../models/cart.model'
 const { QueryTypes } = require ( 'sequelize' )
 
 export async function getProductsInCart(req, res) {
     try {
         const { id } = req.params
         const sales = await 
         sequelize.query(
             `SELECT 
              S.id, 
              S.fk_id_user, 
              S.fk_id_product, 
              P.name, 
              S.quantity, 
              S.price, 
              S.sold 
              FROM Sales S 
              LEFT JOIN Products P 
              ON S.fk_id_product = P.id
              WHERE S.fk_id_user = ?
              AND S.sold = ?`,
              { 
                 replacements: [id, '0'],
                 type: QueryTypes.SELECT 
              }
         ) 
         res.json({sales})
     } catch (error){
         console.log('Se presentó un error al obtener los productos del carrito de compras:..',error);         
     }
 }
 //------------------------------------------------------------------------------
 export async function numRecordsInCart ( req, res ){
     try {
         const recordsInCar = await
         sequelize.query(
             `SELECT 
              COUNT(*) AS RECORDS_IN_CART
              FROM Sales 
              WHERE fk_id_user = ?
              AND sold = ?`,
              {
                 replacements: [req.body.id,  '0'],
                 type: QueryTypes.SELECT
              }
         )
         res.json({num: recordsInCar})   
         console.log(`Número de registos del usuario ${req.body.id}: ${recordsInCar[0].RECORDS_IN_CART}`);      
     } catch (error) {
         console.log('Se presentó un error al contar los productos del carrito de compras:..',error)         
     }
 }
 //------------------------------------------------------------------------------ 
 export async function insertProduct(req, res){
     try {
         const { fk_id_user, fk_id_product, quantity, price } = req.body   
         const productFound = await Sales.findOne({
             where: {
                 fk_id_user: req.body.fk_id_user,
                 fk_id_product: req.body.fk_id_product,
                 sold: false
             },
             attributes: [ 'fk_id_user', 'fk_id_product', 'sold']
         })

         if (productFound){
             console.log('Existe:....', productFound);
             return res.json({
                 message: 'El producto ya existe en el carrito de compras',
                 productFound: true
             })
         }
         const newProduct = await Sales.create({
             fk_id_user,
             fk_id_product,
             quantity,
             price,
             sold: false
         },{
             fields: ['fk_id_user', 'fk_id_product', 'quantity', 'price', 'sold']                       
         })
         if (newProduct){
            return res.json({
                 message: 'Producto created sucefully',
                 data: newProduct
            })
            
         } else {
             console.log('Error al agregar el producto');
         }         
     } catch (error) {
         console.log('Se presentó el siguiente error al agregar el producto al carrito:...', error);         
     }
 }
 //------------------------------------------------------------------------------
 export async function updateProdutInCart (req, res) {
     try {
         const { id } = req.params
         const { fk_id_user } = req.body

         const productInCartToUpdate = await Sales.findOne({
             attributes: ['id', 'fk_id_user', 'fk_id_product', 'quantity', 'price', 'sold'],
             where: {id}     
         })
         const productoInCardUpdated = await Sales.update(
             {
                 sold: true
             },
             {
                 where: {id}
             }             
         )
         res.json({productoInCardUpdated})           
     } catch (error) {
         console.log('Se presentó un error al actualizar los productos en sales:', error);         
     }
 }
 //------------------------------------------------------------------------------