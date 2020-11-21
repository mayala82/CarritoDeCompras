import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardProductsComponent } from './components/dashboard-products/dashboard-products.component';
import { ShowCartComponent } from './components/show-cart/show-cart.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    DashboardProductsComponent,
    ShowCartComponent,
    ShowDetailsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
         provide: HTTP_INTERCEPTORS,
         useClass: TokenInterceptorService,
         multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
