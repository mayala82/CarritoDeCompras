 import { environment } from './../../environments/environment';
 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';

 @Injectable({
     providedIn: 'root'
 })
 export class CartService {

 constructor(private http: HttpClient) { }
     getProductsInCart(id): any {
         return this.http.get( `${environment.serverUrl}/api/cart/${id}`);
     }
     numRecordsInCart(user): any {
         return this.http.put(`${environment.serverUrl}/api/cart/`, user);
     }
     updateProdutInCart(id, user): any {
         return this.http.put( `${environment.serverUrl}/api/cart/${id}`, user);
     }
}
