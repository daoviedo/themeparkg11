import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Button} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class Login extends Component{
      state = {
          UserID: "",
          Password: "",
          output:"",
      };
      handleUserID = text =>{
          this.setState({ UserID: text.target.value });
      }
      handlePassword = text =>{
          this.setState({ Password: text.target.value });
      }
      Login(){

          fetch('http://157.230.172.23:4000/login',{
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    userID: this.state.UserID,
                    password: this.state.Password
                })
           }).then(res => res.json())
           .then(result => {
               this.setState({output: result.status});
               localStorage.setItem('userID',result.userID);
        })
           .catch(err => console.log(err))
           
      }
      
      render() {
          if(this.state.output === 1){
              window.location.replace('/');
          }
          else{
            return (
                <div className= "Login">
                <TopBar/>
                <div>
                   <header className = "Login-header">
                       <center><h1 className="Login-title">Please login</h1></center>
                   </header>
                      <center><FormControl margin="normal" required >
                        <InputLabel htmlFor="UserID" >User ID</InputLabel>
                        <Input id="UserID" name="UserID" autoComplete="User ID" autoFocus onChange={this.handleUserID} value={this.state.UserID}/>
                      </FormControl></center>
                      <center><FormControl margin="normal" required >
                         <InputLabel htmlFor="Password">Password</InputLabel>
                          <Input name="Password" type="Password" id="Password" onChange={this.handlePassword} value={this.state.Password}/>
                      </FormControl></center>
                  <center><Button onClick={()=>this.Login()}>Login </Button></center>
                </div>
                </div>
           );
          }
          
      }
  }
  
  export default Login;