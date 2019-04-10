import React, { Component } from 'react';
import TopBar from './components/TopBar';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

class RideAnalytics extends Component {
  state = {
    data: [],
    dataVal: "year",
    yearList: [],
    monthList: [],
    rideList: [],
    selectedYear: 0,
    selectedMonth: 0    
  }

  componentDidMount() {
    this.fetchRideList();
    this.fetchPivot();
  }

  fetchPivot() {
    fetch(`http://157.230.172.23:4000/ridepivot`, {
      method: "GET",
    })
    .then(res => res.json())
    .then(result => this.setState({data: result.data}))
  }

  fetchRideList() {
    fetch(`http://157.230.172.23:4000/ridelist`, {
      method: "GET",
    })
    .then(res => res.json())
    .then(result => this.setState({rideList: result.data}))
    .catch(err => console.log(err))
  }

  render() {
      return (
          <React.Fragment>
              <TopBar/>
              <div style={{textAlign: "center"}}>
                  <h1>Ride Analytics</h1>
                  <br/>
                  <LineChart 
                  width={600} 
                  height={300} 
                  data={this.state.data}
                  style={{margin: 'auto'}}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="month"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />

              <Line type="monotone" dataKey="Big Twister" stroke="#8884d8" />
              <Line type="monotone" dataKey="Zero Fall" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Big Ride" stroke="#ea0000" />
              </LineChart>
              </div>
          </React.Fragment>  
      );
    }
}
export default RideAnalytics;