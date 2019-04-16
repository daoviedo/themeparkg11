import React, { Component } from 'react';
import TopBar from './components/TopBar';
import RideGrid from './components/RideGrid';
import './css/PageStyles.css';

class Rides extends Component {
  state = {
    rideList: []
  }
  componentDidMount(){
    fetch(`http://api.themepark.ga/ridelist`, {
        method: "GET",
    })
        .then(res => res.json())
        .then(result => this.setState({ rideList: result.rideList }))
        .catch(err => console.log(err))
}
render() {
    return (
        <header className="header2">
            <TopBar/>
            <RideGrid list={this.state.rideList}/>       
        </header>
    );
}
}

export default Rides;