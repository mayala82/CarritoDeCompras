 import React, { Component } from 'react'
 import './Login.css'
 import axios from 'axios'
 
 
 export default class Login extends Component {
     constructor (props){
         super (props)
         this.state = {
             userName: '',             
             password: '',
             logErrors: [],   
             loginSucces: true
             
         }
         this.handleChangeUserName = this.handleChangeUserName.bind(this)
     }
     //------------------------------------------------------------------
     handleChangeUserName(e) { //Controla los cambios del input donde se escribe el email         
         this.setState({userName: e.target.value});
         this.setState({ [e.target.name]: e.target.value }); 
     }
     //------------------------------------------------------------------
     handleOnChangePassword = (e) => {
         this.setState({password: e.target.value });
         this.setState({ [e.target.name]: e.target.value });
     }
     //------------------------------------------------------------------
     validate = () => {
         
         let tempErrors = this.state.logErrors
         let formIsValid = true
         if (this.state.userName.length === 0){
             formIsValid = false
             tempErrors['email'] = 'Correo electrónico es requerido'
         }else{
             if(this.state.userName !== "undefined") {
                 let lastAtPos = this.state.userName.lastIndexOf('@')
                 let lastDotPos = this.state.userName.lastIndexOf('.')
                 if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.userName.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.userName.length - lastDotPos) > 2)) {
                     formIsValid = false;
                     tempErrors["email"] = "Email no es válido";
                 }
             }
         }
         if (this.state.password.length === 0){
             formIsValid = false
             tempErrors['password'] = 'Password es requerido'
         }
         this.setState({logErrors: tempErrors})
         console.log(this.state.logErrors)
         return formIsValid;   
     }
     onSubmit = async e => {         
         e.preventDefault()
         if(this.validate()) {
             const user = {
                 email: this.state.userName,
                 password: this.state.password
             }
             axios.post(`http://localhost:8080/api/users/`, user)
             .then(res => {
                 console.log(res)
                 if (res.data.message === 'Usuario no existe...'){
                     this.setState({loginSucces: false})
                 }else{
                     this.setState({loginSucces: true})
                     localStorage.setItem('reaToken', res.data.token)
                     localStorage.setItem('reaCurrentUser', res.data.currentUser.id)
                     this.numRecordsInCart()
                     window.location.href = '/Products'
                 }
             })
         }else{
             console.log('Errores de validación...');
         }
     }

     //------------------------------------------------------------------
     numRecordsInCart(){
         const user = {id: localStorage.getItem('reaCurrentUser')};
         axios.put(`http://localhost:8080/api/cart/`, user)
             .then( res => {
                 console.log('Número de registros en el carrito...:', res.data.num[0].RECORDS_IN_CART);                                                                      
             })
     }
     //------------------------------------------------------------------
     render() {
         const isLoggedIn = this.state.loginSucces
         return (
             <div>
                 <div className="main-login">
                     <div className="columns is-mobile container is-8">
                         <div className="column is-half is-offset-one-quarter">
                             <label className="label has-text-white is-size-4 columns is-centered">Inicia sesión</label>
                             { !isLoggedIn ? 
                                 <h6 className="has-text-white"> <b>Error en nombre de usuario y/o contraseña</b> </h6>
                                 : 
                                 <p></p>
                             }                             
                             <form
                                 onSubmit={this.onSubmit}
                                 noValidate
                             >
                                 <div className="field">
                                     <label className="label has-text-white is-left" align="left">Correo electrónico</label>
                                     <div className="control has-icons-left has-icons-right">
                                         <input 
                                             value={this.state.userName}
                                             name="userName"                                             
                                             type="email"
                                             className="input is-success"
                                             id="defaultFormRegisterEmailEx2"
                                             placeholder="E-mail"
                                             autoFocus
                                             required
                                             onChange={this.handleChangeUserName}
        
                                         />
                                         <span className="icon is-small is-left">
                                             <i className="fa fa-user"></i>
                                         </span>
                                         <span className="icon is-small is-right">
                                             <i className="fa fa-check"></i>
                                         </span>                                         
                                     </div>
                                     <span className = 'help has-text-white' align="left">{this.state.logErrors['email']}</span>
                                 </div>
                                 <div className="field">
                                     <label className="label has-text-white is-left" align="left">Contraseña</label>
                                     <div className="control has-icons-left has-icons-right">
                                         <input 
                                             value={this.state.password}
                                             type="password"
                                             className="input is-success"
                                             placeholder="Password"
                                             required
                                             onChange={this.handleOnChangePassword}                                             
                                         />
                                         <span className="icon is-small is-left">
                                             <i className="fa fa-key"></i>
                                         </span>
                                         <span className="icon is-small is-right">
                                             <i className="fa fa-check"></i>
                                         </span>                                         
                                     </div>
                                 </div>
                                 <span className = 'help has-text-white' align="left">{this.state.logErrors['password']}</span>
                                 <div className="field is-grouped columns is-centered test">
                                     <div 
                                         className="control">
                                             <button 
                                                 type = 'submit' 
                                                 onClick={() => this.onSubmit}
                                                 className="button is-success">
                                                     Ingresar
                                                 </button>
                                     </div>
                                 </div>
                             </form>
                         </div>

                     </div>
                 </div>
             </div>
         )
     }
 }
 
