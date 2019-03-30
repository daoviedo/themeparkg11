import React, { Component } from 'react';
import TopBar from './components/TopBar';

class ScanRides extends Component {
    render() {
        return (
            <React.Fragment>
                <TopBar/>
                <div style={{textAlign: "center"}}>
                    <h1>Scan Tickets for Rides</h1>
                </div>
            </React.Fragment>
        );
    }
}

export default ScanRides;