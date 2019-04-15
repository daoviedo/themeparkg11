import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { TextField, MenuItem, Button, Typography, Paper } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import './css/PageStyles.css';

class ScanRides extends Component {
    state = {
        listOfRides: [],
        selectedRide: "",
        inputScan: "",
        output: "",
        rainout: 0,
    }
    componentDidMount(){
        this.fetchRideList();
        this.fetchRainOut();
    }

    fetchRideList(){
        fetch(`http://api.themepark.ga/ridelist`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ listOfRides: result.rideList }))
            .catch(err => console.log(err))
    }
    fetchRainOut(){
        fetch(`http://api.themepark.ga/rainout`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ rainout: result.rainedOut }))
            .catch(err => console.log(err))
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    scanTicket = _ => {
        fetch(`http://api.themepark.ga/ridescan`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rideID: this.state.selectedRide,
                ticketID: this.state.inputScan
            }),
        })
        .then(res => res.json())
        .then(result => {this.setState({output: result.status}); this.openWindow()})
        .catch(err => console.log(err))
    }
    outputRainout(){
        if(this.state.rainout === 1){
            return <Typography color="error"><ErrorIcon/>Park Is Closed for Today Due to Rainout</Typography>;
        }
        else{
            return <div/>;
        }
    }
    returnOut(){
        if(this.state.timer){
            if(this.state.output === 1){
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
        }, 700);  
    }

    render() {
        return (
            <header className="header5">
                <TopBar/>
                <div style={{textAlign: "center", paddingTop: 100}}>
                <h2 style={{color: 'white'}}>Scan Tickets for Rides</h2>
                </div>
                <Paper style={{margin: 'auto', width: '400px'}}>
                <div style={{textAlign: "center", paddingTop: '50px', paddingBottom: '50px'}}>
                    <TextField disabled={this.state.rainout === 1} select required label="Ride" name="selectedRide" onChange={this.handleChange} value={this.state.selectedRide} style={{width: 200}}>
                        {this.state.listOfRides.map(option => (
                            <MenuItem disabled={option.NeedMaintenance > 0} key={option.RideID} value={option.RideID}>
                            {option.RideName}
                            </MenuItem>
                            )
                        )}
                    </TextField>
                    <div style={{lineHeight : '56px', textAlign: 'center', marginTop: 20}}>
                    <TextField
                            name="inputScan"
                            disabled={this.state.selectedRide === ""}
                            value={this.state.inputScan}
                            onChange={this.handleChange}
                            label="Ticket ID"
                            type="number"
                            variant="outlined"
                            style={{width: "150px", paddingRight: '10px'}}
                        />
                        <Button size='large' variant="contained" onClick={this.scanTicket} disabled={this.state.selectedRide === ""}>
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

export default ScanRides;