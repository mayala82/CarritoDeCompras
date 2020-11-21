import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardProductsComponent } from './components/dashboard-products/dashboard-products.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { ShowCartComponent } from './components/show-cart/show-cart.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
   { path: '', component: LoginComponent },
   { path: 'products', component: DashboardProductsComponent, canActivate: [AuthGuard] },
   { path: 'products/show-details/:id', component: ShowDetailsComponent, canActivate: [AuthGuard]},
   { path: 'showcart', component: ShowCartComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
