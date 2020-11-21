 import { Router } from 'express'
 const router = Router()

 import * as cartCtrl from '../controllers/cart.controller'

 router.get('/:id', cartCtrl.getProductsInCart)
 router.post('/', cartCtrl.insertProduct)
 router.put('/', cartCtrl.numRecordsInCart)
 router.put('/:id', cartCtrl.updateProdutInCart)

 
 export default router