 import React, { Component } from 'react'
 import axios from 'axios'
 import './Show-details.css'
 
 export default class ShowDetails extends Component {
     state = {
         id: '',
         name: '',
         price: 0,
         quantity: 0
     }
     async componentDidMount(){
         if ( this.props.match.params.id) {
             const res = await axios.get(`http://localhost:8080/api/products/${this.props.match.params.id}` )
             console.log(res.data);
             this.setState({
                 name: res.data.stockOneProduct.name,
                 price: res.data.stockOneProduct.price,
                 quantity: res.data.stockOneProduct.quantity
             })
             
         }
     }
     render() {
         if(!localStorage.getItem('reaCurrentUser')){
             window.location.href = '/' 
             return
         }
         return (
             <div>
                 <div className="container">
                     <div className="columns is-mobile is-centered">
                         <div className="column is-10">
                             <div className="columns main-div">
                                 <div className="column">
                                     <div class="card">
                                         <div class="is-size-4 is-vcentered">
                                             <h5 class="is-size-5"><b>{this.state.name.slice(0,1).toUpperCase() + this.state.name.slice(1, -4)}</b> </h5>
                                         </div>
                                         <div class="cadr-image">
                                             <figure class='image is-4by3'>
                                                 <img src={'/img/' + this.state.name} alt=""/>
                                             </figure>
                                         </div>
                                         <div class="card-footer">
                                             <a href="/products" class="button is-info">Atrás</a>
                                         </div>
                                     </div>     
                                 </div>
                                 <div className="column">
                                     <p className="bd-notification is-primary">
                                         <code className="html"><b>Precio:{this.state.price} </b> </code> <br/>
                                     </p>
                                     <p className="bd-notification is-primary">
                                         <code className="html"><b>Unidades disponibles:{this.state.quantity}</b> </code><br/>
                                     </p>  
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>                 
             </div>
         )
     }
 }