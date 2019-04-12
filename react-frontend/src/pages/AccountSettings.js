import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Button} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class AccountSettings extends Component{
    state = {
        userID: localStorage.getItem('userID'),
        employeeInfoList: [],
        Password: "",
        NewPassword: "",
        CheckPassword: "",
        output:"",
        correctpass: ""
    };
    componentDidMount(){
        fetch('http://157.230.172.23:4000/getEmployeeInfo',{
                method: 'GET',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    userID: this.state.userID,
                })
           }).then(res => res.json())
           .then(result => {
                this.setState({employeeInfoList: result.data});

        })
           .catch(err => console.log(err))
    }
handleChangedPassword(){
        localStorage.clear();
        this.setState({userID: null});
        window.location.replace('/login');
    }
handlePassword = text =>{
    this.setState({ Password: text.target.value });
}
handleNewPassword = text =>{
    this.setState({ NewPassword: text.target.value });
}
handleCheckPassword = text =>{
    this.setState({ CheckPassword: text.target.value });
}
handlecomparePassword(){
    if(this.state.NewPassword===this.state.CheckPassword){
        this.ChangePassword();
    }else{
        this.setState({output: 7})
    }
}
output(){
    if(this.state.output === 7){
       return <center><text><font color="red">New Password dose not match Check Password</font></text></center>
    }else if(this.state.output === 0){
       return <center><text><font color="red">Original Password is incorrect</font></text></center>
    }
}
ChangePassword(){

    fetch('http://157.230.172.23:4000/changePassword',{
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    userID: this.state.userID,
                    password: this.state.Password,
                    newPassword: this.state.NewPassword
                })
           }).then(res => res.json())
           .then(result => {
                this.setState({output: result.status});
                    })
           .catch(err => console.log(err))

}
render() {
    if(this.state.output===1){
        this.handleChangedPassword();
    }
      return (
          <div className= "AccountSettings">
          <TopBar/>
          <div>
             <header className = "AccountSettings-header">
                 <center>name: {this.state.employeeInfoList[1]}</center>
             </header>
                <center><FormControl margin="normal" required >
                  <InputLabel htmlFor="Password" >Old Password</InputLabel>
                  <Input id="Password" name="Password" type="Password" autoComplete="Password ID" autoFocus onChange={this.handlePassword} value={this.state.Password}/>
                </FormControl></center>
                <center><FormControl margin="normal" required >
                   <InputLabel htmlFor="Password">New Password</InputLabel>
                    <Input name="NewPassword" type="Password" id="NewPassword" onChange={this.handleNewPassword} value={this.state.NewPassword}/>
                </FormControl></center>
                <center><FormControl margin="normal" required >
                   <InputLabel htmlFor="Password">Check Password</InputLabel>
                    <Input name="CheckPassword" type="Password" id="CheckPassword" onChange={this.handleCheckPassword} value={this.state.CheckPassword}/>
                </FormControl></center>
            <center><Button onClick={()=>this.handlecomparePassword()}>Change Password</Button></center>
            {this.output()}
          </div>
          </div>
     );
 }
    
    
}
export default AccountSettings;