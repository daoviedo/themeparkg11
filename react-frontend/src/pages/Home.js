import React, { Component } from 'react';
import TopBar from './components/TopBar';
import HCarousel from './components/HomeCarousel';
import './css/PageStyles.css';

class Home extends Component {
    render() {
        return (
            <header className="header4">
                <TopBar/>
                <HCarousel/>
                <div className="framecont">
                <div className="item3"><h2>Tickets On Sale! $35</h2></div>  
                <div className="item4"><h2>Right</h2></div>
                <div className="item5"><h2>Refundable if Park Rains Out</h2></div>
                </div>
            </header>
        );
    }
}
export default Home;