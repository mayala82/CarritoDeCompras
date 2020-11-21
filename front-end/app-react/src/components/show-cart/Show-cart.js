 import React, { Component } from 'react'
 import axios from 'axios'
 import Navigation from '../nav-bar/Nav-bar'
 import '../show-cart/Show-cart.css'
 import swal from 'sweetalert';
 
 export default class ShowCart extends Component {
     constructor (props){
         super(props) 
         this.state = {
             productsInCart: [],
             totalSale: 0,
             currentId: localStorage.getItem('reaCurrentUser'),
             numRecords: 0,
         }    
     }
     componentDidMount(){
         this.getProductsInCart()
     }
     getProductsInCart(){
         let total = 0
         axios.get(`http://localhost:8080/api/cart/${this.state.currentId}`)
         .then(res=>{
             const results = res.data.sales
             for (const product of results){
                 this.state.productsInCart.push(product)
                 total +=  product.price * product.quantity
             }
             this.setState({totalSale: total})
         })
         this.numRecordsInCart();
     }
     numRecordsInCart(){
         const user = {id: localStorage.getItem('reaCurrentUser')};
         axios.put(`http://localhost:8080/api/cart/`, user)
             .then( res => {
                 this.setState({numRecords: res.data.num[0].RECORDS_IN_CART})
             })
     }
     makePay(){
         const user = { fk_id_user: localStorage.getItem('reaCurrentUser')};
         for (const p of this.state.productsInCart){
             
             const product = { quantityToBuy: Number(p.quantity)}
             const id = p.fk_id_product
             axios.put(`http://localhost:8080/api/products/${id}`, product).
             then(res => {
                 console.log('IdProduct...:', id, '   Cantidad: ', product, res);
             })
             axios.put( `http://localhost:8080/api/cart/${p.id}`, user)
             .then(res => {
                 console.log('Actualizado....',res);
             })
         }
         swal({
             title: 'Venta procesada',
             text: `Su venta ha sido procesada satisfactoriamente. Muchas gracias`,
             icon: 'success',
         }).then(function(){
             window.location.href = '/Products' 
         })         
     }
     render() {
         if(!localStorage.getItem('reaCurrentUser')){
             window.location.href = '/' 
             return
         }
         if (this.state.productsInCart.length === 0){
             return(
                 <div className="container">
                     <div className="main-column">
                         <header className = "">
                             <div className="column is-7 ml-5">
                                 <h3 className='is-size-3 is-vcentered mt-5 mb-6'>Carrito de compras</h3>
                             </div>
                             <hr className = 'is-centered'/>
                         </header>
                         <div class="notification is-warning">
                             <h3 class="is-size-4">No ha seleccionado productos</h3>
                             <div class="buttons navbar-end">
                                 <a href="products" class="button is-dark">Ir a productos</a>
                             </div>
                         </div>                      
                      </div>
                 </div>
             )


         }
         return (
             <div>
                 <Navigation counter = {this.state.numRecords}/>
                 <div className="container">
                     <div className="main-column">
                         <header className = "">
                             <div className="column is-7 ml-5">
                                 <h3 className='is-size-3 is-vcentered mt-5 mb-6'>Carrito de compras</h3>
                             </div>
                             <hr className = 'is-centered'/>
                         </header>
                         <div className="table-container table-responsive" align='center'>
                             <table className="table table is-bordered is-striped is-narrow is-hoverable table-responsive">
                                 <thead className='thead'>
                                     <tr>
                                         <th scope="col" align='center'>Imagen</th>
                                         <th scope="col">Producto</th>
                                         <th scope="col">Precio</th>
                                         <th scope="col">Cantidad</th>
                                         <th scope="col">Subtotal</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {
                                         this.state.productsInCart.map(p=>(
                                             <tr key={p.id}>
                                                 <td align='center'>
                                                     <div className="card-image" style={{width: '4rem', height: '5rem'}}>
                                                         <figure className='image is-4by3 is-centered'>
                                                         <img src={'/img/' + p.name} alt=""/>
                                                         </figure>
                                                     </div>
                                                 </td>
                                                 <td align='left'>{p.name.slice(0,1).toUpperCase() + p.name.slice(1, -4)}</td>
                                                 <td align='right'>{p.price}</td>
                                                 <td align='right'>{p.quantity}</td>
                                                 <td align='right'>{p.price * p.quantity}</td>
                                             </tr>
                                         ))
                                     }
                                     <tr >
                                         <td colSpan = '6' align='right'>
                                             <p className="is-size-5">Total: <b>{this.state.totalSale } </b> </p>
                                         </td>
                                     </tr>
                                 </tbody>

                            </table>
                            <div className="column ">
                             <form>
                                 <div className="buttons navbar-end">
                                     <button 
                                         type = 'button'
                                         className="button is-success"
                                         onClick={() => this.makePay()}
                                         >Pagar
                                     </button>
                                     <a href="/products" className="button is-dark">Ir a productos</a>
                                 </div>
                             </form>
                         </div>
                         </div>
                     </div>

                 </div>
             </div>
         )
     }
 }
 