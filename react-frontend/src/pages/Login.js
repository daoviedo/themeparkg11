import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Button, TextField, Typography} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class Login extends Component{
      state = {
          UserID: "",
          Password: "",
          output:""
      };
      handleUserID = text =>{
          this.setState({ UserID: text.target.value });
      }
      handlePassword = text =>{
          this.setState({ Password: text.target.value });
      }
      Login(){

          fetch('http://157.230.172.23:4000/login',{
              header:{
                  "Content-Type" : "application/json"
              },
              method: 'POST',
              body:JSON.stringify({
                userID: this.state.UserID,
                password: this.state.Password
              })
           }).then(res => res.json())
           .then(result => {this.setState({output: result.status})})
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
                     <center><FormControl margin="normal" required >
                       <InputLabel htmlFor="UserID" >User ID</InputLabel>
                       <Input id="UserID" name="UserID" autoComplete="User ID" autoFocus onChange={this.handleUserID} value={this.state.UserID}/>
                     </FormControl></center>
                     <center><FormControl margin="normal" required >
                        <InputLabel htmlFor="Password">Password</InputLabel>
                         <Input name="Password" type="Password" id="Password" onChange={this.handlePassword} value={this.state.Password}/>
                     </FormControl></center>
                 <center><Button onClick={()=>this.Login}>Login </Button></center>
               </div>
               {this.returnOut()}
               </div>
          );
      }
  }

  
  export default Login;