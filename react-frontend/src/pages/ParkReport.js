import React, { Component } from 'react';
import TopBar from './components/TopBar';
import RideStatus from './components/RideStatus';
import SalesReport from './components/SalesReport';

class Report extends Component {
  
  render() {
    return(
      <React.Fragment>
        <TopBar/>
        <RideStatus/>
        <div style={{height:50}}></div>
        <SalesReport/>
      </React.Fragment>
    );
  }
}
export default Report;