import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { TextField, MenuItem, Button, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';

class ScanRides extends Component {
    state = {
        listOfRides: [],
        selectedRide: "",
        inputScan: "",
        output: ""
    }
    componentDidMount(){
        fetch(`http://157.230.172.23:4000/ridelist`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ listOfRides: result.rideList }))
            .catch(err => console.log(err))
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    scanTicket = _ => {
        fetch(`http://157.230.172.23:4000/ridescan`,{
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
            <React.Fragment>
                <TopBar/>
                <div style={{textAlign: "center"}}>
                    <h1>Scan Tickets for Rides</h1>
                    <TextField select required label="Ride" name="selectedRide" onChange={this.handleChange} value={this.state.selectedRide} style={{width: 200}}>
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
                </div>
            </React.Fragment>
        );
    }
}

export default ScanRides;