import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Rides from './pages/Riding';
import Dining from './pages/Dining';
import EntranceScan from './pages/EntranceScan';
import ScanRides from './pages/ScanRides';
import Maintenance from './pages/Maintenance';
import CreateRide from './pages/CreateRide';

import { Route } from "react-router-dom";
import Department from './pages/Department';
import Login from './pages/Login';
import Analytics from './pages/Analytics';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/park-tickets" exact component={Ticket} />
        <Route path="/rides" exact component={Rides} />
        <Route path="/dining" exact component={Dining} />
        <Route path="/entrance-scan" exact component={EntranceScan} />
        <Route path="/scan-rides" exact component={ScanRides} />
        <Route path="/maintenance" exact component={Maintenance} />
        <Route path="/new-ride" exact component={CreateRide} />
        <Route path="/department" exact component={Department} />
        <Route path="/login" exact component={Login}/>
        <Route path="/riding" exact component={Rides}/>
        <Route path="/analytics" exact component={Analytics}/>
      </React.Fragment>
    );
  }
}

export default App;
