import React, { Component } from 'react';
import TopBar from './components/TopBar';
import {TextField, MenuItem} from '@material-ui/core';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

class RideAnalytics extends Component {
  state = {
    data: [],
    dataVal: "year",
    yearList: [],
    monthList: [],
    selectedYear: 0,
    selectedMonth: 0    
  }

  



}