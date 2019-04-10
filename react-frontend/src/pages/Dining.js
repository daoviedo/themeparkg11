import React, { Component } from 'react';
import TopBar from './components/TopBar';
import Concession from './components/Concession';
import './css/PageStyles.css';

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
            <header className="header3">
                <TopBar/>
                <Concession list={this.state.concessionList}/>       
            </header>
        );
    }
}

export default Dining;