 import { Router } from 'express'
 const router = Router()

 import * as productCtrl from '../controllers/product.controller'

 router.get('/', productCtrl.getStockProducts)
 router.get('/:id', productCtrl.getOneProduct)
 router.put('/:id', productCtrl.updateProduct)
  
 export default router