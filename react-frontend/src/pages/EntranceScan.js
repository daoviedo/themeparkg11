import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Button, TextField, Typography} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';

class EntranceScan extends Component {
    state = {
        inputScan : "",
        output : "",
        timer: false
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    scanTicket = _ => {
        fetch(`http://157.230.172.23:4000/entrance-scan`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ticketID: this.state.inputScan
            }),
        })
        .then(res => res.json())
        .then(result => {this.setState({output: result.status}); this.openWindow()})
        .catch(err => console.log(err))
    }
    returnOut(){
        if(this.state.timer){
            if(this.state.output === 0){
                return <Typography color="error"><ErrorIcon/>Invalid Ticket ID</Typography>
            }
            else if(this.state.output === 1){
                return <Typography color="error"><ErrorIcon/>Ticket is not Valid for Today - For a Future Date</Typography>
            }
            else if(this.state.output === 2){
                return <Typography color="error"><ErrorIcon/>Ticket has already been used</Typography>
            }
            else if(this.state.output === 3){
                return <Typography style={{color: "green"}}><DoneIcon/>Ticket Scanned Successfully</Typography>
            }
            else{
                return <Typography color="error"><ErrorIcon/>Something Went Wrong!</Typography>
            }
        }
    }
    openWindow(){
        this.setState({timer: true});
        setTimeout(() => {
            this.setState({timer: false});
            this.setState({output: ""});
        }, 2000);  
    }
    render() {
        return (
            <React.Fragment>
                <TopBar/>
                <div style={{textAlign: "center"}}>
                    <h1>This is The Entrance Scan</h1>
                    <div style={{lineHeight : '56px', textAlign: 'center'}}>
                    <TextField
                            name="inputScan"
                            value={this.state.inputScan}
                            onChange={this.handleChange}
                            label="Ticket ID"
                            type="number"
                            variant="outlined"
                            style={{width: "150px", paddingRight: '10px'}}
                        />
                        <Button size='large' variant="contained" onClick={this.scanTicket}>
                        Scan
                        </Button>  
                    </div>
                    {this.returnOut()}
                </div>
            </React.Fragment>
        );
    }
}

export default EntranceScan;