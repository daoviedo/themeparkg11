import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Button, Paper} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class Login extends Component{
      state = {
          UserID: "",
          username: "",
          Password: "",
          output:"",
          departmentID: "",
          depLoaded: false
      };
      handleUserID = text =>{
          this.setState({ username: text.target.value });
      }
      handlePassword = text =>{
          this.setState({ Password: text.target.value });
      }
     
      getDepartmentID(id){
         fetch('http://api.themepark.ga/getDepartmentID',{
                 method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    userID: id,
                 })
              }).then(res => res.json())
             .then(result => {
                localStorage.setItem('departmentID',result.departmentID[0].dID);
                this.setState({departmentID: result.departmentID[0].dID, depLoaded: true});
                 
        })
       .catch(err => console.log(err))
      }

      Login(){
          
          fetch('http://api.themepark.ga/login',{
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    userID: this.state.username,
                    password: this.state.Password
                })
           }).then(res => res.json())
           .then(result => {
                this.getDepartmentID(result.userID);
                localStorage.setItem('userID',result.userID);
                this.setState({UserID: result.userID, output: result.status});
        })
           .catch(err => console.log(err))
           
      }
      output(){
        if(this.state.output === 0){
            return <center><text><font color="red">Username or Password are incorrect</font></text></center>
        }
      }

      render() {
          if(this.state.output === 1 && this.state.depLoaded){
              window.location.replace('/');
          }
            return (
                <div className= "Login">
                <TopBar/>
                <div style={{textAlign: "center", paddingTop: 100}}>
                <h2 style={{color: 'Black'}}>Account Information</h2>
                </div>
                 <Paper style={{margin: 'auto', width: '300px'}}>
                    <div style={{textAlign: "center", paddingTop: '50px', paddingBottom: '50px'}}>
                      <center><FormControl margin="normal" required >
                        <InputLabel htmlFor="username" >Username</InputLabel>
                        <Input id="username" name="username" autoComplete="User ID" autoFocus onChange={this.handleUserID} value={this.state.username}/>
                      </FormControl></center>
                      <center><FormControl margin="normal" required >
                         <InputLabel htmlFor="Password">Password</InputLabel>
                          <Input name="Password" type="Password" id="Password" onChange={this.handlePassword} value={this.state.Password}/>
                      </FormControl></center>
                  <center><Button onClick={()=>this.Login()}>Login </Button></center>
                  {this.output()}
                </div>
                </Paper>
                </div>
           );
          
          
      }
  }
  
  export default Login;