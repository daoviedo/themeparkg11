import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Button, Paper} from '@material-ui/core';

class AccountSettings extends Component{
    state = {
        userID: localStorage.getItem('userID'),
        fName: "",
        lName: "",
        depoName: "",
        Password: "",
        NewPassword: "",
        CheckPassword: "",
        output:"",
        correctpass: ""
    };
    componentDidMount(){
        fetch('http://157.230.172.23:4000/getEmployeeInfo',{
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    userID: this.state.userID,
                })
           }).then(res => res.json())
           .then(result => {
               console.log(result)
               this.setState({fName: result.data[0].FirstName});
               this.setState({lName: result.data[0].LastName});
                this.setState({depoName: result.data[0].Name});

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
          <div style={{textAlign: "center", paddingTop: 100}}>
          <h2 style={{color: 'Black'}}>Account Information</h2>
          </div>
          <Paper style={{margin: 'auto', width: '300px'}}>
          <div style={{textAlign: "center", paddingTop: '50px', paddingBottom: '50px'}}>
                 <center><b>First Name:</b> {this.state.fName}</center>
                 <center><b>Last Name:</b> {this.state.lName}</center>
                 <center><b>Department:</b> {this.state.depoName}</center>
                 <center><b>User ID:</b> {this.state.userID}</center>
                 <center><Button onClick={()=>window.location.replace('/ChangePassword')}>Change Password</Button></center>
             </div>
             </Paper>
          </div>
     );
 }
    
    
}
export default AccountSettings;