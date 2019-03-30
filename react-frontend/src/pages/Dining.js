import React, { Component } from 'react';
import TopBar from './components/TopBar';
import Concession from './components/Concession';

class Dining extends Component {
    state = {
        concessionList: []
    }
    componentDidMount(){
        fetch(`http://157.230.172.23:4000/concessionlist`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ concessionList: result.diningList }))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <React.Fragment>
                <TopBar/>
                <div style={{textAlign: "center"}}>
                    <h1>This is The Dining Page</h1>
                </div>
                <br/>
                <Concession list={this.state.concessionList}/>       
            </React.Fragment>
        );
    }
}

export default Dining;