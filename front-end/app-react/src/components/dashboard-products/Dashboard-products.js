 import React, { Component } from 'react'
 import Navigation from '../nav-bar/Nav-bar'
 import axios from 'axios'
 import './Dashboard-products.css'
 import { Link } from 'react-router-dom'
 import swal from 'sweetalert';
 
 export default class DashboardProducts extends Component {
     constructor(props){
         super(props);
         this.state = {
             products: [],
             textToSearch: '',
             quantityToSell: 1,
             numRecords: 0
         }
         this.updateSearch = this.updateSearch.bind(this);
         this.handleChange = this.handleChange.bind(this);
     }

 //----------------------------------------------------------------------------------------------
   componentDidMount(){
         this.getProducts();
         this.numRecordsInCart();
   }
 //----------------------------------------------------------------------------------------------
  getProducts(){ 
    axios.get(`http://localhost:8080/api/products`)
     .then(res => {
         this.setState({ products: res.data.stockProducts });
         console.log('Todos los productos:...', res.data.stockProducts);
     })
  }
  sendToCart(p){
     if ( this.state.quantityToSell > p.quantity){
         swal('Existencias insuficientes', `No existe suficiente cantidad de ${p.name.slice(0,1).toUpperCase() + p.name.slice(1, -4)} para esta venta`, 'error' )
         return
     }
     if ( this.state.quantityToSell < 0 ){
         swal('Valores negativos', `No se permiten valores negativos para ${p.name.slice(0,1).toUpperCase() + p.name.slice(1, -4)}`, 'error' )
         return
     }
     this.idCurrentUser = localStorage.getItem('reaCurrentUser');
     const product = {
         fk_id_user: Number(this.idCurrentUser),
         fk_id_product: p.id,
         quantity: this.state.quantityToSell,
         price: Number(p.price)
     }
     axios.post(`http://localhost:8080/api/cart/`, product)
     .then(res => {
         if (res.data.productFound){
             swal('Producto duplicado', `${p.name.slice(0,1).toUpperCase() + p.name.slice(1, -4)}, ya existe en el carrito de compras`, 'error');
         }
         this.numRecordsInCart();
     })
  }
 //----------------------------------------------------------------------------------------------
 numRecordsInCart(){
     const user = {id: localStorage.getItem('reaCurrentUser')};
     axios.put(`http://localhost:8080/api/cart/`, user)
         .then( res => {
             this.setState({numRecords: res.data.num[0].RECORDS_IN_CART})
         })
 }
  updateSearch (e){
     this.setState({
         textToSearch: e.target.value
     })
 }
 //----------------------------------------------------------------------------------------------
  handleChange(event) { //Controla los cambios del input de cantidad
     this.setState({quantityToSell: event.target.value});
  }
 //----------------------------------------------------------------------------------------------
     render() {
        
         if(!localStorage.getItem('reaCurrentUser')){
             window.location.href = '/' 
             return
         }
         let filteredProducts = this.state.products.filter(
             (product) => {
                 return product.name.toLowerCase().indexOf(this.state.textToSearch.toLowerCase()) !== -1
             }
         )
         return (
             <div>
                 <Navigation counter = {this.state.numRecords}/>
                 <div className="container main-div " >
                     <header>
                         <div className="columns ">
                             <div className="column">
                                 <h3 className='is-size-4 is-vcentered'>Catálogo de productos</h3>
                             </div>
                             <div className="column is-4 ml-5">
                                 ¿Que estás buscando?
                                 <div className="control">
                                     <input 
                                         type="text" 
                                         className="input is-primary"
                                         placeholder="Buscar producto" 
                                         value={this.state.textToSearch}
                                         onChange={this.updateSearch.bind(this)}
                                         autoFocus
                                     />                                        
                                 </div>
                             </div>
                         </div>
                         <hr className = 'is-centered'/>
                     </header>
                     <div className='scroll'>
                         <div className ='columns is-multiline is-mobile is-centered'>{
                             filteredProducts.map(p =>(
                                 <div className ="columns test mt-2" key={p.id}>
                                     <div className="card is-mobile column is-one-quarter px-3 py-3" style={{width: '18rem', height: '28rem'}}>
                                         <div className="card-image">
                                             <figure className="image is-4by3">
                                                 <img src={'/img/' + p.name} alt=""/>
                                             </figure>
                                         </div>
                                         <div className="card-content">
                                             <div className="media">
                                                 <div className="media-content">                                                     
                                                     <p className="title is-4">{p.name.slice(0,1).toUpperCase() + p.name.slice(1, -4)}</p>
                                                 </div>
                                             </div>
                                             <div className="content">
                                                 <p className="subtitle is-6"><b>Precio:</b> {p.price}</p>
                                                 <p className="subtitle is-6"><b>Udes. disponibles:</b> {p.quantity}</p> 
                                                 <div className="buttons is-narrow">
                                                     <Link 
                                                         className="button is-info is-small"
                                                         to={"/edit/" + p.id}
                                                         style={{width: '4rem'}}>
                                                             Detalles
                                                     </Link>
                                                     <button 
                                                         className="button is-warning is-small" 
                                                         onClick={() => this.sendToCart(p)}
                                                         style={{width: '4rem'}}>
                                                             Agregar
                                                     </button>
                                                     <div className="control is-5">
                                                         <input 
                                                             className="input is-primary is-small"
                                                             type="number"
                                                             min="0"
                                                             max={p.quantity} 
                                                             disabled={ (p.quantity <= 0 ) ? true : false } 
                                                             style={{'width': '50px'}}
                                                             onChange={this.handleChange}
                                                             defaultValue="1"                                                  
                                                         />
                                                     </div> 
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             ))
                         }
                         </div>
                     </div>                     
                 </div>
             </div>
         )
     }
 }
 