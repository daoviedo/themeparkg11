import React, { Component } from 'react';
import TopBar from './components/TopBar';
import Concession from './components/Concession';

class Dining extends Component {
    render() {
        return (
            <React.Fragment>
                <TopBar/>
                <div style={{textAlign: "center"}}>
                    <h1>This is The Dining Page</h1>
                </div>
                <br/>
                <Concession/>
                
            </React.Fragment>
        );
    }
}

export default Dining;