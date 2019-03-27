import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (

      <Route path="/" exact component={Home} />

    );
  }
}

export default App;
