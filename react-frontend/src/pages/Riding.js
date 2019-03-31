import React, { Component } from 'react';
import TopBar from './components/TopBar';
import RideGrid from './components/RideGrid'

class Rides extends Component {
  state = {
    rideList: []
  }
  componentDidMount(){
    fetch(`http://157.230.172.23:4000/ridelist`, {
        method: "GET",
    })
        .then(res => res.json())
        .then(result => this.setState({ rideList: result.rideList }))
        .catch(err => console.log(err))
}
render() {
    return (
        <React.Fragment>
            <TopBar/>
            <div style={{textAlign: "center"}}>
                <h1>This is The Rides Page</h1>
            </div>
            <br/>
            <RideGrid list={this.state.rideList}/>       
        </React.Fragment>
    );
}
}

export default Rides;