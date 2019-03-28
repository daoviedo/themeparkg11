import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Button, TextField} from '@material-ui/core';

class EntranceScan extends Component {
    state = {
        inputScan : "",
        output : ""
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
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err))
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
                        <Button size='large' variant="contained" style={{marginBottom: 5}}>
                        Scan
                        </Button>  
                    </div>
                           
                </div>
            </React.Fragment>
        );
    }
}

export default EntranceScan;