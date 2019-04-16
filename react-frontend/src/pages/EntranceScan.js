import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Button, TextField, Typography, Paper} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import './css/PageStyles.css';
import './css/otherfixes.css';

class EntranceScan extends Component {
    state = {
        inputScan : "",
        output : "",
        timer: false,
        rainout: 0,
    }
    componentDidMount(){
        fetch(`http://api.themepark.ga/rainout`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ rainout: result.rainedOut }))
            .catch(err => console.log(err))
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    scanTicket = _ => {
        fetch(`http://api.themepark.ga/entrance-scan`,{
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
    outputRainout(){
        if(this.state.rainout === 1){
            return <Typography color="error"><ErrorIcon/>Park Is Closed for Today Due to Rainout</Typography>;
        }
        else{
            return <div/>;
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
            <header className="header5">
                <TopBar/>
                <div style={{textAlign: "center", paddingTop: 100}}>
                <h2 style={{color: 'white'}} className="scantitles">Entrance Scan</h2>
                </div>
                <Paper style={{margin: 'auto', width: '400px'}}>
                <div style={{textAlign: "center", paddingTop: '50px', paddingBottom: '50px'}}>
                    <div style={{lineHeight : '56px', textAlign: 'center'}}>
                    <TextField
                            disabled={this.state.rainout === 1}
                            name="inputScan"
                            value={this.state.inputScan}
                            onChange={this.handleChange}
                            label="Ticket ID"
                            type="number"
                            variant="outlined"
                            style={{width: "150px", paddingRight: '10px'}}
                        />
                        <Button disabled={this.state.inputScan < 1} size='large' variant="contained" onClick={this.scanTicket}>
                        Scan
                        </Button>
                    </div>
                    {this.returnOut()}
                    {this.outputRainout()}
                </div>
                </Paper>
            </header>
        );
    }
}

export default EntranceScan;