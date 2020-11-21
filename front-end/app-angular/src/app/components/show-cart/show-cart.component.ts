 import { Component, OnInit } from '@angular/core';
 import { CartService } from '../../services/cart.service';
 import { HttpProductsService } from '../../services/http-products.service';
 import { Router, CanActivate } from '@angular/router';
 import swal from 'sweetalert';


 @Component({
     selector: 'app-show-cart',
     templateUrl: './show-cart.component.html',
     styleUrls: ['./show-cart.component.css']
 })
 export class ShowCartComponent implements OnInit {
     totalSale = 0;
     constructor( private cartService: CartService,
                  private httpProductService: HttpProductsService,
                  public router: Router) { }
     productsInCart  = [];
     currentId = localStorage.getItem('angCurrentUser');
     numRecords = 0;
     ngOnInit(): void {
         this.getProductsInCart();
         this.numRecordsInCart();
     }
     getProductsInCart(): any{
         this.cartService.getProductsInCart(this.currentId).subscribe((data: any) => {
             const results = data.sales;
             for (const product of results) {
                 this.productsInCart.push(product);
                 this.totalSale += product.price * product.quantity;
             }
             console.log('Prductos de carrito: ', this.productsInCart);
         });
     }
     numRecordsInCart(): any {
         const user = {id: localStorage.getItem('angCurrentUser')};
         this.cartService.numRecordsInCart(user).subscribe((res: any) => {
             this.numRecords = res.num[0].RECORDS_IN_CART;
         });
     }
     makePay(): any {
         const user = { fk_id_user: localStorage.getItem('angCurrentUser')};
         for (const p of this.productsInCart) {
             const product = { quantityToBuy: Number(p.quantity)};
             this.httpProductService.updateProduct(p.fk_id_product, product).subscribe((res: any) => {
                 console.log('Actualizado...', res.productToUpdate);
             });
             this.cartService.updateProdutInCart(p.id, user).subscribe((res: any) => {
                  console.log('Actualizado...', res.productoInCardUpdated);
             })
         }
         swal('Venta procesada', `Su venta ha sido procesada satisfactoriamente. Muchas gracias`, 'success' )
         this.router.navigate(['/products']);
     }

}
