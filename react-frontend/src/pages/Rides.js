import React, { Component } from 'react';
import TopBar from './components/TopBar';

class Rides extends Component {
    render() {
        return (
            <React.Fragment>
                <TopBar/>
                <div style={{textAlign: "center"}}>
                    <h1>This is The Rides Page</h1>
                </div>
            </React.Fragment>
        );
    }
}

export default Rides;