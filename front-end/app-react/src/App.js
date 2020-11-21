 import React from 'react';
 import { BrowserRouter as Router, Route } from 'react-router-dom'
 import 'react-bulma-components/dist/react-bulma-components.min.css';
 import 'font-awesome/css/font-awesome.min.css'; 
 
 import './App.css';
 import DashboardProducts from './components/dashboard-products/Dashboard-products'
 import ShowDetails from './components/show-details/Show-details'
 import ShowCart from './components/show-cart/Show-cart'
 import Login from './components/auth/login/Login'
 function App() {
     return (
         <Router className="App">             
             <Route exact path = "/" component = {Login}/>          
             <Route exact path = "/Products" component = {DashboardProducts}/> 
             <Route exact path = "/edit/:id" component = {ShowDetails}/>
             <Route exact path = "/ShowCart" component = {ShowCart}/>             
         </Router>
     );
 }
 
 export default App;
