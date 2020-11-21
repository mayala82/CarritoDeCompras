 import Product from '../models/product.model'

 export async function getStockProducts(req, res) {
     try {
         const stockProducts = await Product.findAll({
             attributes: ['id', 'name', 'price', 'quantity'],
             order: [
                 ['name', 'ASC']
             ],
         })
         res.json({stockProducts})
         
     } catch (error) {
         console.log('Se presentó el siguiente error al listar Productos:...', error);                  
     }
 }
 //---------------------------------------------------------------------------
 export async function getOneProduct(req, res) {
     try {
         const { id } = req.params
         const stockOneProduct = await Product.findOne({
             where: {id},
             attributes: ['id', 'name', 'price', 'quantity']
         })
         res.json({stockOneProduct})        
     } catch (error) {
         console.log('Se presento el siguiente error al consultar el producto:...', error );
     }
 }
 //---------------------------------------------------------------------------
 export async function updateProduct(req, res) {
     try {
         const { id } = req.params
         const { quantityToBuy } = req.body

         const productToUpdate = await Product.findOne({
             attributes: ['id', 'name', 'price', 'quantity'],
             where: {id}             
         })
         const newValue = Number(productToUpdate.quantity) - Number(quantityToBuy)
         const updatedProduct = await Product.update( 
             {
                 quantity: newValue 
             },
             {
                 where: {id}
             }
         )
         console.log('Producto:...............', productToUpdate.name);
         console.log('Cantidad actual:........', productToUpdate.quantity);
         console.log('Cantidad a vender:......', quantityToBuy);
         console.log('Cantidad actualizada:...', newValue);

         res.json({updatedProduct})        
    } catch (error) {
         console.log('Se presento el siguiente error al actualizar el producto:...', error );
    }
 }
 //---------------------------------------------------------------------------