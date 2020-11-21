 import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Params  } from '@angular/router';
 import { HttpProductsService } from '../../services/http-products.service';

 @Component({
     selector: 'app-show-details',
     templateUrl: './show-details.component.html',
     styleUrls: ['./show-details.component.css']
 })
 export class ShowDetailsComponent implements OnInit {
     id: string;
     product: {
         name: string,
         price: number,
         quantity: number
     };
     constructor(
         private httpProductsService: HttpProductsService,
         private activatedRoute: ActivatedRoute
     ){
         this.id = this.activatedRoute.snapshot.params.id;
     }

  ngOnInit(): any{
     this.httpProductsService.getOneProduct(this.id).subscribe((data: any) => {
         this.product = data.stockOneProduct;
         console.log('DETALLES:...', this.product);
     });
  }
 }
