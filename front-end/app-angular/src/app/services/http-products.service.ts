 import { environment } from './../../environments/environment';
 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';

 @Injectable({
     providedIn: 'root'
})
 export class HttpProductsService {
     id: string;

     constructor(private http: HttpClient) { }
     getProducts(): any{
         return this.http.get( `${environment.serverUrl}/api/products`);
     }
     getOneProduct(id): any{
         return this.http.get( `${environment.serverUrl}/api/products/${id}`);
     }
     sendToCart(product): any {
         return this.http.post(`${environment.serverUrl}/api/cart/`, product);
     }
     updateProduct(id, product): any {
         return this.http.put(`${environment.serverUrl}/api/products/${id}`, product);
     }
 }
