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
                localStorage.setItem('userID',result.userID);
                this.setState({output: result.status});
        })
           .catch(err => console.log(err))
           
      }
      
      render() {
          if(this.state.output === 1){
              window.location.replace('/');
          }else if(this.state.output === 0){
            return (
                <div className= "Login">
                <TopBar/>
                <div>
                   <header className = "Login-header">
                       <center><h1 className="Login-title">Please login</h1></center>
                   </header>
                      <center><FormControl margin="normal" required >
                        <InputLabel htmlFor="UserID" >Username</InputLabel>
                        <Input id="UserID" name="UserID" autoComplete="User ID" autoFocus onChange={this.handleUserID} value={this.state.UserID}/>
                      </FormControl></center>
                      <center><FormControl margin="normal" required >
                         <InputLabel htmlFor="Password">Password</InputLabel>
                          <Input name="Password" type="Password" id="Password" onChange={this.handlePassword} value={this.state.Password}/>
                      </FormControl></center>
                  <center><Button onClick={()=>this.Login()}>Login </Button></center>
                  <center><text><font color="red">Username or Password are incorrect</font></text></center>
                </div>
                </div>
           );
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
                        <InputLabel htmlFor="UserID" >Username</InputLabel>
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