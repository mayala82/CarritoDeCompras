 import { logging } from 'protractor';
 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { environment } from './../../environments/environment';
 import { Router } from '@angular/router';

 @Injectable({
     providedIn: 'root'
 })
 export class AuthService {
     loggedIn: boolean;
     constructor(private http: HttpClient, private router: Router) { }
     login(user): any{
         return this.http.post(`${environment.serverUrl}/api/users/`, user);
     }
     loggIn(): any {
         return !!localStorage.getItem('angToken');
     }
     getToken(): any{
         return localStorage.getItem('angToken');
     }
     getCurrentId(): any {
         return localStorage.getItem('angCurrentUser');
     }
     logout(): any {
         localStorage.removeItem('angToken');
         localStorage.removeItem('angCurrentUser');
         this.http.get(`${environment.serverUrl}/api/users/logout`);
         this.router.navigate(['/']);
     }
  }
