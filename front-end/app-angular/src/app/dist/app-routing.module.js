"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./components/auth/login/login.component");
var dashboard_products_component_1 = require("./components/dashboard-products/dashboard-products.component");
var show_details_component_1 = require("./components/show-details/show-details.component");
var show_cart_component_1 = require("./components/show-cart/show-cart.component");
var routes = [
    { path: '', component: login_component_1.LoginComponent },
    { path: 'products', component: dashboard_products_component_1.DashboardProductsComponent },
    { path: 'products/show-details/:id', component: show_details_component_1.ShowDetailsComponent },
    { path: 'showcart', component: show_cart_component_1.ShowCartComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
