 import { Component, OnInit, OnDestroy } from '@angular/core';
 import { HttpProductsService } from '../../services/http-products.service';
 import { CartService } from '../../services/cart.service';
 import { Router } from '@angular/router';
 import swal from 'sweetalert';

 @Component({
     selector: 'app-dashboard-products',
     templateUrl: './dashboard-products.component.html',
     styleUrls: ['./dashboard-products.component.css']
 })
 export class DashboardProductsComponent implements  OnInit, OnDestroy {
     idCurrentUser: string;
     idProduct: number;
     quantity: number;
     price: number;
     name: string;
     productFound: false;

     constructor(
         private httpProductsService: HttpProductsService,
         private cartService: CartService,
         public router: Router) { }
         setFilter = '';
         products  = [];
         numRecords = 0;

     ngOnInit(): void {
         this.httpProductsService.getProducts().subscribe((data: any) => {
             const results = data.stockProducts;
             for (const product of results) {
                 this.products.push(product);
             }
             console.log('Todos los productos: ', this.products);
             this.numRecordsInCart();
         });

     }
     sendToCart(id, howMany: any, price, name, quantity): void{
         this.idCurrentUser = localStorage.getItem('angCurrentUser');
         this.idProduct = id;
         this.quantity = howMany;
         this.price = price;
         this.name = name;
         const product = {
             fk_id_user: Number(this.idCurrentUser),
             fk_id_product: this.idProduct,
             quantity: Number(this.quantity),
             price: Number(this.price)
         };
         if (howMany > quantity){
             swal('Existencias insuficientes', `No existe suficiente cantidad de ${this.name.toUpperCase()} para esta venta`, 'error' )
             return;
          }
         if (howMany < 0 ){
             swal('Valores negativos', `No se permiten valores negativos para ${this.name.toUpperCase()} para esta venta`, 'error' )
             return;
         }
         this.httpProductsService.sendToCart(product).subscribe((res: any) => {
             this.productFound = res.productFound;
             if (this.productFound){
                 swal('Producto duplicado', `${this.name.toUpperCase()}, ya existe en el carrito de compras`, 'error');
             }
             this.numRecordsInCart();
             console.log(res);
         });
     }
     numRecordsInCart(): any {
         const user = {id: localStorage.getItem('angCurrentUser')};
         this.cartService.numRecordsInCart(user).subscribe((res: any) => {
               this.numRecords = res.num[0].RECORDS_IN_CART;
         });
     }

     ngOnDestroy(): void {
         console.log('Bye');
     }
 }
