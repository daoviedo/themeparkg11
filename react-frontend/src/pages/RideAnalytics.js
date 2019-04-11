import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

function RideAnalytics(props){
      return (  
        <LineChart data={props.data} width={800}
        height={500}
        style={{margin: 'auto'}}
        margin={{left: 0, right: 60}}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {props.rides.map(option => (
            <Line key={option.RideID} type="monotone" dataKey={option.RideName} stroke={'#'+Math.floor(Math.random()*16777215).toString(16)}/>
          ))}
        </LineChart>
    );
}
export default RideAnalytics;