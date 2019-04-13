import React, { Component } from 'react';
import TopBar from './components/TopBar';
import RideStatus from './components/RideStatus';
import SalesReport from './components/SalesReport';
import BetweenReport from './components/BetweenReport';
import './css/backg.css';

class Report extends Component {
  
  render() {
    return(
      <header className="headerb">
        <TopBar/>
        <RideStatus/>
        <div style={{height:10}}></div>
        <SalesReport/>
        <div style={{height:10}}></div>
        <BetweenReport/>
        <div style={{height:10}}></div>
      </header>
    );
  }
}
export default Report;