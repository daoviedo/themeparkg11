import React, { Component } from 'react';
import TopBar from './components/TopBar';

class Dining extends Component {
    render() {
        return (
            <React.Fragment>
                <TopBar/>
                <div style={{textAlign: "center"}}>
                    <h1>This is The Dining Page</h1>
                </div>
            </React.Fragment>
        );
    }
}

export default Dining;