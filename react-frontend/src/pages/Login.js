import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Button, TextField, Typography} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';

class Login extends Component{
    constructor(){
      super()
      this.state = {
          UserID: "",
          Password: "",
          output:""
      };
    }
      handleUserID(text){
          this.setState({ UserID: text.target.value });
      }
      handlePassword(text){
          this.setState({ Password: text.target.value });
      }
      Login(){

          fetch('http://157.230.172.23:4000/login',{
              header:{
                  "Content-Type" : "application/json"
              },
              method: 'POST',
              body:JSON.stringify({
                UserID: this.state.UserID,
                Password: this.state.Password
              })
           }).then(res => res.json())
           .then(result => {this.setState({output: result.status}); this.openWindow()})
           .catch(err => console.log(err))
      }
      returnOut(){
        if(this.state.timer){
            if(this.state.output === 0){
                return <Typography color="error"><ErrorIcon/>Invalid UserID or Password</Typography>
            }
            else if(this.state.output === 1){
                return <Typography color="error"><ErrorIcon/>Invalid UserID or Password</Typography>
            }
            else if(this.state.output === 2){
                return <Typography color="error"><ErrorIcon/>This needs to change</Typography>
            }
            else{
                return <Typography color="error"><ErrorIcon/>Something Went Wrong!</Typography>
            }
        }
    }
      render() {
          return (
               <div className= "Login">
               <TopBar/>
               <div>
                  <header className = "Login-header">
                      <center><h1 classname="Login-title">Please login</h1></center>
                  </header>
                  <center><input type= "text" placeholder= "User ID" onClick = {(text)=>{this.handleUserID(text)}} required autofocus/></center>
                 <center><input type= "password" placeholder= "Password" onClick = {(text)=>{this.handlePassword(text)}} required /></center>
                 <br/>
                 <center><button onClick={this.Login} >Login</button></center>
               </div>
               {this.returnOut()}
               </div>
          );
      }
  }

  
  export default Login;