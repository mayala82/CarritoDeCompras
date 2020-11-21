 import React, { Component } from 'react'
 import { Link } from 'react-router-dom'
 import '../nav-bar/Nav-bar.css'
 
 export default class Navbar extends Component {
     logout(){
         localStorage.removeItem('reaToken')
         localStorage.removeItem('reaCurrentUser')
     }
     render() {
         return (
             <nav className="navbar container" role="navigation" aria-label="main navigation">
                 <div className="navbar-brand is-size-5">
                     <h3>La bodega</h3>
                 </div>
                 <div id="navbarBasicExample" className="navbar-menu">
                     <div className="navbar-end">
                         <div className="nav-link">
                             <Link
                                 className="is-light"
                                 to="/Products">
                                 <i className="fa fa-th"></i>
                             </Link>
                             <Link
                                 className="is-light"
                                 to="/ShowCart"
                                 >
                                 <i className="fa fa-shopping-cart">
                                     <span className="tag is-danger">{this.props.counter ? this.props.counter: ''}</span>
                                 </i>
                             </Link>
                             <Link className="is-light" to="/Products">
                                 <i className="fa fa-credit-card"></i>
                             </Link>
                             <Link className="is-light" 
                                 to="/" >
                                 <i 
                                     className="fa fa-sign-out"
                                     onClick={this.logout}>  
                                 </i>
                             </Link>
                         </div>
                     </div>
                 </div>
             </nav>
         )
     }
 }
 