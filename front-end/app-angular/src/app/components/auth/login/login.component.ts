 import { Component, OnInit } from '@angular/core';
 import { AuthService } from '../../../services/auth.service';
 import { CartService } from '../../../services/cart.service';
 import { Router } from '@angular/router';
 import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

 @Component({
     selector: 'app-login',
     templateUrl: './login.component.html',
     styleUrls: ['./login.component.css']
 })
 export class LoginComponent implements OnInit {
     loginForm: FormGroup;
     logError: boolean;
     email: string;
     password: string;


 constructor(public authService: AuthService,
             public cartService: CartService, private builder: FormBuilder, public router: Router) {
     this.loginForm = this.builder.group({
         email: [null, Validators.compose([Validators.email, Validators.required])],
         password: [null, Validators.required]
     });
 }

 ngOnInit(): void {

 }
 login(form: FormGroup): void {
     this.email = form.value.email;
     this.password = form.value.password;
     if (this.email !== null && this.password !== null) {
         const user = {email: this.email, password: this.password};
         this.authService.login(user).subscribe((res: any) => {
         console.log('DATOS DEVUELTOS DEL SERVER:...', res);
         if (res.token){
             localStorage.setItem('angToken', res.token);
             localStorage.setItem('angCurrentUser', res.currentUser.id);
             this.numRecordsInCart();
             this.router.navigate(['products']);
         } else{ // Error al validar el usuario y password
             this.logError = true;
         }
      });
     }
  }
  numRecordsInCart(): any {
      const user = {id: localStorage.getItem('angCurrentUser')};
      this.cartService.numRecordsInCart(user).subscribe((res: any) => {
          console.log('Número de registros en el carrito...:', res.num[0].RECORDS_IN_CART);
      });
  }
}
