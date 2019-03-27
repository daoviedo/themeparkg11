import React, { Component } from 'react';
import TopBar from './components/TopBar';

class Ticket extends Component {
    render() {
        return (
            <React.Fragment>
                <TopBar/>
                <div style={{textAlign: "center"}}>
                    <h1>This is The Ticket Page</h1>
                </div>
            </React.Fragment>
        );
    }
}

export default Ticket;