import React, { Component } from 'react';
import TopBar from './components/TopBar';
import RideStatus from './components/RideStatus';
import SalesReport from './components/SalesReport';
import BetweenReport from './components/BetweenReport';

class Report extends Component {
  
  render() {
    return(
      <React.Fragment>
        <TopBar/>
        <RideStatus/>
        <div style={{height:50}}></div>
        <SalesReport/>
        <div style={{height:50}}></div>
        <BetweenReport/>
      </React.Fragment>
    );
  }
}
export default Report;