import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Rides from './pages/Rides';
import Dining from './pages/Dining';
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/park-tickets" exact component={Ticket} />
        <Route path="/rides" exact component={Rides} />
        <Route path="/dining" exact component={Dining} />
      </React.Fragment>
    );
  }
}

export default App;
